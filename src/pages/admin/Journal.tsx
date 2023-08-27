import {useEffect, useState} from "react";
import {AdminJournal, Grade, Journal, Plan, Subject, User} from "../../types/types.ts";
import {
    GetAllAdminJournals,
    GetAllGrades,
    GetAllPlans,
    GetAllSubjects,
    GetAllUsers,
    SendAdminJournal
} from "../../api/utils.ts";
import Table from "../../components/UI/Table.tsx";
import Modal from "../../components/UI/Modal.tsx";
import ModalButton from "../../components/UI/ModalButton.tsx";
import {Form} from "../../components/UI/Form.tsx";
import {ElementType, SelectNodes} from "../../components/UI/types.ts";
import {Modal as BootstrapModal} from "bootstrap/dist/js/bootstrap.bundle.min.js"
import {GetLocalUser} from "../../utils/utils.ts";

export default function Journal() {
    const [journals, setJournals] = useState([] as AdminJournal[])
    const [grades, setGrades] = useState([] as Grade[])
    const [users, setUsers] = useState([] as User[])
    const [subjects, setSubjects] = useState([] as Subject[])
    const [plans, setPlans] = useState([] as Plan[])
    const [current_journal, setCurrentJournal] = useState({} as AdminJournal)
    useEffect(() => {
        GetAllAdminJournals().then((res) => {
            setJournals(res)
        })
        GetAllGrades().then((res) => {
            setGrades(res)
        })
        GetAllUsers().then((res) => {
            setUsers(res)
        })
        GetAllSubjects().then((res) => {
            setSubjects(res)
        })
        GetAllPlans().then((res) => {
            setPlans(res)
        })
    }, [])

    function GetOptionsFromUsers(): SelectNodes[] {
        let not_student = users.filter((el) => !el.role.includes("student"))
        return not_student.map((el) => {
            return {
                value: el.id,
                text: `${el.surname} ${el.name[0]}.`
            } as SelectNodes
        })
    }
    function onSubmit(el: any){
        if (current_journal.id){
            el.id = current_journal.id
        }
        if (el.grade_id){
            el.head_id = grades.find((el2) => el2.id === Number(el.grade_id))?.head_id
        }
        el.methodist_id = GetLocalUser().id
        SendAdminJournal(el).then(()=>{
            GetAllAdminJournals().then((res)=>{
                setJournals(res)
            })
        })
    }

    return (
        <>
            <Modal title={"Журнал"} connected_with={"journal_modal"}>
                <Form
                    elements={[
                        {
                            label: "Класс",
                            name: "grade_id",
                            type: ElementType.SMART_SELECT,
                            settings: {
                                options: grades.map((el) => {
                                    return {
                                        value: el.id,
                                        text: el.name
                                    } as SelectNodes
                                })
                            }
                        },
                        {
                            label: "Предмет",
                            name: "subject_id",
                            type: ElementType.SMART_SELECT,
                            settings: {
                                options: subjects.map((el) => {
                                    return {
                                        value: el.id,
                                        text: el.name
                                    } as SelectNodes
                                })
                            }
                        },
                        {
                            label: "План",
                            name: "plan_id",
                            type: ElementType.SMART_SELECT,
                            settings: {
                                options: plans.map((el) => {
                                    return {
                                        value: el.id,
                                        text: el.name
                                    } as SelectNodes
                                })
                            }
                        },
                        {
                            label: "Учитель",
                            name: "teacher_id",
                            type: ElementType.SMART_SELECT,
                            settings: {
                                options: GetOptionsFromUsers()
                            }
                        },
                        {
                            label: "Рассписание",
                            name: "schedule",
                            type: ElementType.SCHEDULE,
                            settings: {}
                        }
                    ]}
                    instance={current_journal}
                    onSubmit={onSubmit}/>
            </Modal>
            <ModalButton connected_with={"journal_modal"}
                         button_text={"Создать журнал"}
                         additionalClasses={"m-3"}
                         preOpen={() => {
                             setCurrentJournal({} as AdminJournal)
                         }}
            />
            <Table
                elements={journals}
                table_fields={[
                    {
                        label: "Класс",
                        name: "grade_id",
                        valueProcessing: (el) => grades.find((el2) => el2.id === el)?.name
                    },
                    {
                        label: "Предмет",
                        name: "subject_id",
                        valueProcessing: (el) => subjects.find((el2) => el2.id === el)?.name
                    },
                    {
                        label: "План",
                        name: "plan_id",
                        valueProcessing: (el) => plans.find((el2) => el2.id === el)?.name
                    },
                    {
                        label: "Учитель",
                        name: "teacher_id",
                        valueProcessing: (el) => {
                            let res = users.find((el2) => el2.id === el)
                            if (res) {
                                return `${res.surname} ${res.name[0]}.`
                            }
                        }
                    },
                    {
                        label: "Методист",
                        name: "methodist_id",
                        valueProcessing: (el) => {
                            let res = users.find((el2) => el2.id === el)
                            if (res) {
                                return `${res.surname} ${res.name[0]}.`
                            }
                        }
                    }
                ]}
                NeedEdit={true}
                onDelete={() => {
                }}
                onEdit={(el: AdminJournal) => {
                    setCurrentJournal(el)
                    let modal = new BootstrapModal(document.getElementById("journal_modal"), {})
                    modal.show()
                }}/>
        </>
    )
}