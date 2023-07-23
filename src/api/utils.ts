import {Journal, Lesson, User} from "../types/types.ts";
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
        const lessons: Lesson[] = res.data["journal_tables"][0]["lesson"] as Lesson[]
        const grade: User[] = res.data["journal_tables"][0]["grade"]["grade_student"].map((el:any) => {
            return el["student"] as User
        })
        resolve({lessons, grade})
    })
}