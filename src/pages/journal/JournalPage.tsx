import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Journal, Lesson, Mark, User} from "../../types/types.ts";
import {GetJournalData, SendMark} from "../../api/utils.ts";
import LoadingComponent from "../../components/UI/LoadingComponent.tsx";
import JournalHead from "../../components/journal/JournalHead.tsx";
import JournalBody from "../../components/journal/JournalBody.tsx";
import ModalButton from "../../components/UI/ModalButton.tsx";
import Modal from "../../components/UI/Modal.tsx";
import JournalSelect from "../../components/journal/JournalSelect.tsx";
import MessageBlock from "../../components/messages/MessageBlock.tsx";
import {addMessage} from "../../components/messages/messageSlice.ts";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import {MAX_LESSON_IN_PAGE} from "../../config.ts";
import Paginator from "../../components/UI/Paginator.tsx";
// import {Form} from "../../components/UI/Form.tsx";
// import {ElementType} from "../../components/UI/types.ts";

export default function JournalPage() {
    const params = useParams()
    const [lessons, setLessons] = useState([] as Lesson[])
    const [page, setPage] = useState(0)
    const [maxPage, setMaxPage] = useState(-1)
    const [grade, setGrade] = useState([] as User[])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        GetJournalData({id: Number(params.journal_id)}).then(res => {
            setLessons(res.lessons)
            setGrade(res.grade.sort((a, b) => a.surname.localeCompare(b.surname)))
            setMaxPage(res.lessons.length / MAX_LESSON_IN_PAGE)
        })
    }, [params.journal_id])


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

    function GetJournal(result: Journal[]) {
        if (result.length == 0) {
            dispatch(addMessage({
                type: "danger",
                text: "Нет журнала для этого класса и предмета"
            }))
        } else {
            navigate(`/journal/${result[0].id}`)
        }
    }

    function GetLessonByPage() {
        return lessons.slice(page * MAX_LESSON_IN_PAGE, page * MAX_LESSON_IN_PAGE + MAX_LESSON_IN_PAGE)
    }


    return (
        <div className={"full-height"}>
            <MessageBlock/>
            <Modal connected_with={"select_journal_modal"} title={"Выбор журнала"}>
                <JournalSelect GetJournal={GetJournal}/>
            </Modal>
            <ModalButton connected_with={"select_journal_modal"} additionalClasses={"m-3"}
                         button_text={"Выбор журнала"}/>
            {/*<Form elements={*/}
            {/*    [*/}
            {/*        {*/}
            {/*            name:"test",*/}
            {/*            label: "Класс",*/}
            {/*            type: ElementType.SMART_SELECT,*/}
            {/*            settings: {*/}
            {/*                options:[*/}
            {/*                    {*/}
            {/*                        value: "1",*/}
            {/*                        text: "1"*/}
            {/*                    },*/}
            {/*                    {*/}
            {/*                        value: "1",*/}
            {/*                        text: "1"*/}
            {/*                    }*/}
            {/*                ]*/}
            {/*            }*/}
            {/*        },*/}
            {/*        {*/}
            {/*            name:"test1",*/}
            {/*            label: "Предмет",*/}
            {/*            type: ElementType.SMART_SELECT,*/}
            {/*            settings: {*/}
            {/*                options:[*/}
            {/*                    {*/}
            {/*                        value: "1",*/}
            {/*                        text: "1"*/}
            {/*                    },*/}
            {/*                    {*/}
            {/*                        value: "1",*/}
            {/*                        text: "1"*/}
            {/*                    }*/}
            {/*                ]*/}
            {/*            }*/}
            {/*        }*/}
            {/*    ]*/}
            {/*} onSubmit={()=>{console.log("some")}} horizontal={true} additionalClasses={"m-3"} buttonText={"Найти"} additionalClassesButton={"my-4"}/>*/}
            {
                lessons.length > 0 ? (
                    <>
                        <table className={"table table-striped table-bordered"}>
                            <JournalHead lessons={GetLessonByPage()}/>
                            <JournalBody grade={grade} lessons={GetLessonByPage()} onMarkChange={onMarkChange}/>
                        </table>
                        <Paginator max_page={maxPage}
                                   current_page={page}
                                   onPageChange={(new_page) => {
                                       setPage(new_page)
                                   }}/>
                    </>
                ) : <LoadingComponent/>
            }
        </div>
    )

}

