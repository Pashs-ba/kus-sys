import {AdminJournal, Contest, Grade, Journal, Lesson, Mark, Plan, Question, Subject, User} from "../types/types.ts";
import axios from "axios";
import {API_PATH} from "../config.ts";
import {GetLocalUser} from "../utils/utils.ts";
import {ElementType, FormElementType, FormType, ServerForm} from "../components/UI/types.ts";


export function Auth({login, password}: { login: string, password: string }) {
    return new Promise<User>(async (resolve, reject) => {
        try {
            const res = await axios.post(`${API_PATH}/login`, {login, password})
            resolve(res.data.user as User)
        } catch (err) {
            reject(err)
        }
    })
}

export function GetAllJournals({teacher_id}: { teacher_id: number }) {
    return new Promise<Journal[]>(async (resolve) => {
        const res = await axios.get(`${API_PATH}/get/if/journal_table[id,grade_id[name],subject_id[name]/teacher_id=${teacher_id}`)
        resolve((res.data as any)["journal_tables"].map((el: any) => {
            return {
                id: el.id,
                grade: el.grade.name,
                subject: el.subject.name,
            } as Journal
        }))
    })
}

export function GetJournalData({id}: { id: number }) {
    return new Promise<{ lessons: Lesson[], grade: User[] }>(async (resolve) => {
        const res = await axios.get(`${API_PATH}/get/if/journal_table[id,(lesson[id,theme_id[name],date_val,(mark[id,student_id,mark_value,lesson_id])),grade_id[id,name,(grade_student[student_id[*]])]]/id=${id}`)
        const lessons: Lesson[] = res.data["journal_tables"][0]["lessons"] as Lesson[]
        const grade: User[] = res.data["journal_tables"][0]["grade"]["grade_students"].map((el: any) => {
            return el["student"] as User
        })
        resolve({lessons, grade})
    })
}

export function SendMark({mark}: { mark: Mark }) {
    return new Promise<Mark>(async (resolve) => {
        if (mark.mark_value === "") {
            if (mark.id) { // for marks that removed just after create
                await axios.post(`${API_PATH}/drop/mark`, {id: mark.id})
            } else {
                await axios.post(`${API_PATH}/drop/mark`, {student_id: mark.student_id, lesson_id: mark.lesson_id})
            }
            resolve({
                student_id: mark.student_id,
                lesson_id: mark.lesson_id,
                mark_value: mark.mark_value,
            })
        } else {
            const res = await axios.post(`${API_PATH}/post/mark`, {...mark})
            resolve({
                id: res.data,
                student_id: mark.student_id,
                lesson_id: mark.lesson_id,
                mark_value: mark.mark_value,
            })
        }


    })
}

export function GetAllUsers() {
    return new Promise<User[]>(async (resolve) => {
        const res = await axios.get(`${API_PATH}/get/all/user`)
        resolve(res.data.users as User[])
    })
}

export function DeleteUsers(ids: number[]) {
    return new Promise<User[]>(async () => {
        await axios.post(`${API_PATH}/drop/user`, {id: ids})
    })
}

export function SendUser(user: User) {
    return new Promise<User>(async (resolve) => {
        await axios.post(`${API_PATH}/post/user`, user)
        resolve(user)
    })
}

export function SendUserFile(file: File) {
    return new Promise<User>(async () => {
        const data = {
            file: file,
            filename: file.name,
            index: "data"
        }

        await axios.post(`${API_PATH}/upload/user`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    })
}

export function GetAllPlans() {
    return new Promise<Plan[]>(async (resolve) => {
        const res = await axios.get(`${API_PATH}/get/all/plan`)
        resolve(res.data.plans as Plan[])
    })
}

export function DeletePlans(ids: number[]) {
    return new Promise<Plan[]>(async () => {
        await axios.post(`${API_PATH}/drop/plan`, {id: ids})
    })
}

export function GetAllSubjects() {
    return new Promise<Subject[]>(async (resolve) => {
        const res = await axios.get(`${API_PATH}/get/all/subject`)
        resolve(res.data.subjects as Subject[])
    })
}

export function CreatePlan(raw_plan: { name: string, file?: File, subject_id: number | string, id?: number }) {
    return new Promise<void>(async (resolve) => {
        let plan = {
            name: raw_plan.name,
            subject_id: Number(raw_plan.subject_id),
        }
        let config = {}
        if (raw_plan.file) {
            plan["file"] = raw_plan.file
            plan["filename"] = raw_plan.file.name
            plan["index"] = "data"
            config["headers"] = {
                'Content-Type': 'multipart/form-data'
            }
        }
        if (raw_plan.id) {
            plan["id"] = raw_plan.id
        }
        await axios.post(`${API_PATH}/post/plan`, plan, config)
        resolve()
    })
}

export function GetAllGrades() {
    return new Promise<Grade[]>(async (resolve) => {
        const pre_res = await axios.get(`${API_PATH}/get/all/grade[*,(grade_student)]`)
        let res = pre_res.data.grades.map((el: any) => {
            el.student = el.grade_students.map((el: any) => {
                return el.student_id
            })
            delete el.grade_students
            return el
        })
        resolve(res as Grade[])
    })
}

export function SendGrade(grade: {
    id?: number,
    name: string,
    head_id: number | string,
    student?: (number | string)[]
}) {
    return new Promise<void>(async (resolve) => {
        if (grade.student) {
            grade["many_to_many"] = "replace"
            grade["student"] = grade.student.map((el) => {
                return Number(el)
            })
        }
        grade["is_group"] = false
        grade["head_id"] = Number(grade.head_id)
        console.log(grade)
        await axios.post(`${API_PATH}/post/grade`, grade)
        resolve()
    })
}

export function DeleteGrades(ids: number[]) {
    return new Promise<void>(async () => {
        await axios.post(`${API_PATH}/drop/grade`, {id: ids})
    })
}

export function GetAllAdminJournals() {
    return new Promise<AdminJournal[]>(async (resolve) => {
        const res = await axios.get(`${API_PATH}/get/all/journal_table`)
        resolve(res.data.journal_tables as AdminJournal[])
    })
}

export function SendAdminJournal(journal: AdminJournal) {
    journal.grade_id = Number(journal.grade_id)
    journal.head_id = Number(journal.head_id)
    journal.subject_id = Number(journal.subject_id)
    journal.teacher_id = Number(journal.teacher_id)
    journal.plan_id = Number(journal.plan_id)
    journal.methodist_id = Number(journal.methodist_id)
    return new Promise<void>(async (resolve) => {
        await axios.post(`${API_PATH}/post/journal_table`, journal)
        resolve()
    })
}

export function DeleteAdminJournals(ids: number[]) {
    return new Promise<void>(async (resolve) => {
        await axios.post(`${API_PATH}/drop/journal_table`, {id: ids})
        resolve()
    })
}

export function SendSubject(subject: Subject) {
    return new Promise<void>(async (resolve) => {
        await axios.post(`${API_PATH}/post/subject`, subject)
        resolve()
    })
}

export function DeleteSubjects(ids: number[]) {
    return new Promise<void>(async (resolve) => {
        await axios.post(`${API_PATH}/drop/subject`, {id: ids})
        resolve()
    })
}

export function PrintJournal(ids: number[]) {
    return new Promise<string>(async (resolve) => {
        const res = await axios.get(`${API_PATH}/print_journal/${ids.join(",")}`)
        resolve(`https://kusmirror.ru/${res.data}`)
    })
}

export function GetAllContests() {
    return new Promise<Contest[]>(async (resolve) => {
        const user = GetLocalUser()
        const res = await axios.get(`${API_PATH}/get/if/competition_user[competition_id[]]/user_id=${user.id}`)
        resolve(res.data.competition_users.map((el) => {
            return el.competition
        }) as Contest[])
    })
}

export function GetContestWithQuestions(id: number) {
    return new Promise<Contest>(async (resolve) => {
        const raw_competition = await axios.get(`${API_PATH}/get/if/competition/id=${id}`)
        const raw_questions = await axios.get(`${API_PATH}/get/if/competition_question[question_id[id,name]]/competition_id=${id}`)
        const contest = raw_competition.data.competitions[0] as Contest
        contest.questions = raw_questions.data.competition_questions.map((el) => {
            return el.question as Question
        })
        resolve(contest)
    })
}

export function GetFullQuestion(id: number) {
    return new Promise<Question>(async (resolve) => {
        const user = GetLocalUser()
        const raw_question = await axios.get(`${API_PATH}/get_question/${id}/${user.id}`)
        const question = raw_question.data.question as Question
        resolve(question)
    })
}

export function SendAnswer(question_id: number, answer: string) {
    return new Promise<void>(async (resolve) => {
        if (answer === "") return
        const user = GetLocalUser()
        await axios.post(`${API_PATH}/post/answer`, {
            question_id: question_id,
            user_id: user.id,
            value: answer
        })
        resolve()
    })
}

export function GetFormTypeFromString(type: string): ElementType {
    switch (type) {
        case "FILE":
            return ElementType.FILE
        case "TEXTAREA":
            return ElementType.TEXTAREA
        default:
            throw new Error(`Unknown form type: ${type}`)
    }
}

export function GetForms() {
    return new Promise<ServerForm[]>(async (resolve) => {
        const res = await axios.get(`${API_PATH}/get/all/form[id,(field_form[field_id[]]),*]`)
        const pre_forms = res.data.forms as any[]
        resolve(pre_forms.map((el) => {
            const form: ServerForm = {
                id: el.id,
                userName: el.userName,
                techName: el.techName,
                fields:
                    el.field_forms.map((field) => {
                        return {
                            label: field.field.name,
                            name: field.field.label,
                            type: GetFormTypeFromString(field.field.type),
                            settings: {
                                accept: GetFormTypeFromString(field.field.type) == ElementType.FILE ? field.field.info : null
                            }
                        } as FormElementType
                    })
            }
            return form
        }))
    })
//     /api/multitool
}

export function SendForms(techName: string, data: any) {
    return new Promise<void>(async (resolve) => {
        await axios.post(`${API_PATH}/multitool`, {
            techName: techName,
            ...data
        }, {headers: {'Content-Type': 'multipart/form-data'}})
    })
}

export function RegistrationSend(data: any) {
    return new Promise<void>(async (resolve, reject) => {
        try{
            await axios.post(`${API_PATH}/registration`, data)
            resolve()
        }catch(err){
            reject(err)
        }

    })
}