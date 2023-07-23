import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Lesson, User} from "../../types/types.ts";
import {GetJournalData} from "../../api/utils.ts";
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

    // function onMarkChange(student_id, lesson_id, mark_value) {
    //     const new_lessons = lessons
    //     const index = new_lessons.findIndex((lessons) => lessons.id === lesson_id)
    //     const mark = new_lessons[index].mark.findIndex((mark) => mark.student_id === student_id)
    //     if (mark === -1) {
    //         // new_lessons[index].mark.push({student_id, mark_value, lesson_id})
    //     }
    // }

    return (
        <div className={"full-height"}>
            {
                lessons.length > 0 ? (
                    <table className={"table table-striped table-bordered"}>
                        <JournalHead lessons={lessons}/>
                        <JournalBody grade={[...grade]} lessons={[...lessons]}
                                     onMarkChange={(student_id, lesson_id, mark_value) => {
                                        console.log(student_id, lesson_id, mark_value)
                                     }
                                     }
                        />
                    </table>
                ) : <LoadingComponent/>
            }
        </div>
    )

}

