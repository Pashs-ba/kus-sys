export type User = {
    role: string[],
    school_id: number,
    name: string,
    surname: string,
    login: string,
    id: number
}

export type Journal = {
    id: number
    grade: number
    subject: string
}

export type Theme = {
    name: string
}
export type Mark = {
    id: number
    mark_value: string
    student_id: number
    lesson_id: number
}

export type Lesson = {
    theme: Theme,
    mark: Mark[]
    id: number
    date_val: string
}
