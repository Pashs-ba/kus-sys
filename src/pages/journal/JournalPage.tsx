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
import Paginator from "../../components/UI/Paginator.tsx";
import {MonthNumberToName} from "../../utils/utils.ts";
// import {Form} from "../../components/UI/Form.tsx";
// import {ElementType} from "../../components/UI/types.ts";

export default function JournalPage() {
    const params = useParams()
    const [lessons, setLessons] = useState([] as Lesson[])
    const [page, setPage] = useState(0)
    const [grade, setGrade] = useState([] as User[])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        GetJournalData({id: Number(params.journal_id)}).then(res => {
            setLessons(res.lessons)
            setGrade(res.grade.sort((a, b) => a.surname.localeCompare(b.surname)))
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

    function GetMonthsFromLessons() {
        const months = []
        for (let i = 0; i < lessons.length; i++) {
            const date = new Date(lessons[i].date_val)
            months.push(date.getMonth())
        }
        return Array.from(new Set(months))
    }

    function GetLessonByPage() {
        let page_month = GetMonthsFromLessons()[page]
        return lessons.filter((value) => {
            return new Date(value.date_val).getMonth() === page_month
        })
    }

    return (
        <div className={"full-height"}>
            <MessageBlock/>
            <Modal connected_with={"select_journal_modal"} title={"Выбор журнала"}>
                <JournalSelect GetJournal={GetJournal}/>
            </Modal>
            <ModalButton connected_with={"select_journal_modal"} additionalClasses={"m-3"}
                         button_text={"Выбор журнала"}/>
            <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#theme"
                    aria-controls="offcanvasRight">Список тем
            </button>
            <div className="offcanvas offcanvas-end" id="theme">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">Темы</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul className={"list-group"}>
                        {
                            lessons.map((el, index) => {
                                return <li className={"list-group-item"} key={index}>{el.theme.name}</li>
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className="row mx-5">
                <div className="col-10">
                    {
                        lessons.length > 0 ? (
                            <div>
                                <Paginator max_page={GetMonthsFromLessons().length - 1}
                                           current_page={page}
                                           onPageChange={(new_page) => {
                                               setPage(new_page)
                                           }}
                                           custom_page_names={GetMonthsFromLessons().map((month) => MonthNumberToName(month))}
                                />
                                <table className={"table table-striped table-bordered"}>
                                    <JournalHead lessons={GetLessonByPage()}/>
                                    <JournalBody grade={grade} lessons={GetLessonByPage()} onMarkChange={onMarkChange}/>
                                </table>

                            </div>
                        ) : <LoadingComponent/>
                    }
                </div>
                <div className="col-2 overflow-auto" style={{"maxHeight": "80vh"}}>
                    <ul className={"list-group"}>
                    {
                        lessons.map((el, index) => {
                            return <li className={"list-group-item"} key={index}>{el.theme.name}</li>
                        })
                    }
                    </ul>
                </div>
            </div>

        </div>
    )

}

