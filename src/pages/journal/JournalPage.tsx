import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Lesson, Mark, User} from "../../types/types.ts";
import {GetJournalData, SendMark} from "../../api/utils.ts";
import LoadingComponent from "../../components/UI/LoadingComponent.tsx";
import JournalHead from "../../components/journal/JournalHead.tsx";
import JournalBody from "../../components/journal/JournalBody.tsx";

export default function JournalPage() {
    const params = useParams()
    const [lessons, setLessons] = useState([] as Lesson[])
    const [grade, setGrade] = useState([] as User[])

    useEffect(() => {
        GetJournalData({id: Number(params.journal_id)}).then(res => {
            setLessons(res.lessons)
            setGrade(res.grade.sort((a, b) => a.surname.localeCompare(b.surname)))
        })
    }, [])


    function onMarkChange(student_id: number, lesson_id: number, mark_value: string) {
        const new_lessons = lessons
        const index = new_lessons.findIndex((lessons) => lessons.id === lesson_id)
        const mark_index = new_lessons[index].marks.findIndex((mark) => mark.student_id === student_id)
        let mark: Mark
        if (mark_index === -1) {
            new_lessons[index].marks.push({student_id, mark_value, lesson_id})
            mark = new_lessons[index].marks[new_lessons[index].marks.length - 1]
        } else {
            new_lessons[index].marks[mark_index].mark_value = mark_value
            mark = new_lessons[index].marks[mark_index]
        }
        SendMark({mark}).then(() => {
            //TODO Need something?
        })
        setLessons(new_lessons)

    }


    return (
        <div className={"full-height"}>
            {
                lessons.length > 0 ? (
                    <table className={"table table-striped table-bordered"}>
                        <JournalHead lessons={lessons}/>
                        <JournalBody grade={grade} lessons={lessons} onMarkChange={onMarkChange}/>
                    </table>
                ) : <LoadingComponent/>
            }
        </div>
    )

}

