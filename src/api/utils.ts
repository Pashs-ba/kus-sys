import {Journal, Lesson, Mark, User} from "../types/types.ts";
import axios from "axios";
import {API_PATH} from "../config.ts";

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