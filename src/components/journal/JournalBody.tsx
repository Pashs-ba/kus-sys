import {Lesson, Mark, User} from "../../types/types.ts";
import BaseInput from "../UI/BaseInput.tsx";

export default function JournalBody({grade, lessons, onMarkChange}: {
    grade: User[],
    lessons: Lesson[],
    onMarkChange: (student_id: number, lesson_id: number, mark_value: string) => void
}) {
    function GetMarkValue(lesson: Lesson, student: User) {
        const found = lesson.marks.find((mark: Mark) => mark.student_id === student.id)
        return found ? found.mark_value : ""
    }

    return (
        <tbody>
        {
            grade.map((student, index) => {
                return <tr key={student.id}>
                    <td>{index + 1}</td>
                    <td style={{width:"15%"}}>{student.surname} {student.name[0]}.</td>
                    {
                        lessons.map(lesson => {
                            return (
                                <td
                                    key={lesson.id}
                                    className={"m-0 p-0"}
                                >
                                    <BaseInput
                                        additionalClasses={"text-center invisible-input border-0"}
                                        onInput={(el) => {
                                            onMarkChange(student.id, lesson.id, el.currentTarget.value)
                                        }}
                                        value={GetMarkValue(lesson, student)}
                                    />
                                </td>
                            )
                        })
                    }
                </tr>
            })
        }
        </tbody>
    )
}