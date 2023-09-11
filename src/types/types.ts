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
    grade: string
    subject: string
}

export type Theme = {
    name: string
}
export type Mark = {
    id?: number
    mark_value: string
    student_id: number
    lesson_id: number
}

export type Lesson = {
    theme: Theme,
    marks: Mark[]
    id: number
    date_val: string
}
export type Plan = {
    id?: number
    subject_id: number
    name: string
    url: string
}
export type Subject = {
    id: number
    name: string
}
export type Grade = {
    id: number
    name: string
    head_id: number
    is_group: boolean
    student?: number[]
}

export type AdminJournal = {
    id: number
    grade_id: number
    subject_id: number
    teacher_id: number
    plan_id: number
    head_id: number
    schedule: string
    methodist_id: number
}

export type SideBarElementType = {
    text: string,
    icon: string,
    href: string
}

export type Contest = {
    id: number
    name: string
    start_time: string
    end_time: string
    problems?: number[]
    questions?: Question[]
}

export type Question = {
    id: number
    name: string
    nickname?: string
    type?: number
}