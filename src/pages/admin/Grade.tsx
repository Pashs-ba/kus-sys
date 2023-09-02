import {useEffect, useState} from "react";
import {Grade, User} from "../../types/types";
import {DeleteGrades, GetAllGrades, GetAllUsers, SendGrade} from "../../api/utils.ts";
import Table from "../../components/UI/Table.tsx";
import Modal from "../../components/UI/Modal.tsx";
import ModalButton from "../../components/UI/ModalButton.tsx";
import {Form} from "../../components/UI/Form.tsx";
import {ElementType, SelectNodes} from "../../components/UI/types.ts";
import {Modal as BootstrapModal} from "bootstrap/dist/js/bootstrap.bundle.min.js"

export default function Grade() {
    const [grades, setGrades] = useState([] as Grade[])
    const [users, setUsers] = useState([] as User[])
    const [currentGrade, setCurrentGrade] = useState({} as Grade)
    useEffect(() => {
        GetAllGrades().then((res) => {
            setGrades(res)
        })
        GetAllUsers().then((res) => {
            setUsers(res)
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

    function GetStudentsOptions(): SelectNodes[] {
        let students = users.filter((el) => el.role.includes("student"))
        return students.map((el) => {
            return {
                value: el.id,
                text: `${el.surname} ${el.name[0]}.`
            } as SelectNodes
        })
    }

    function OnSubmit(el) {
        if (currentGrade.id) {
            el.id = currentGrade.id
        }
        SendGrade(el).then(() => {
                GetAllGrades().then((res) => {
                    console.log(res)
                    setGrades(res)
                })
            }
        )
    }

    function OnDelete(ids: number[]) {
        setGrades(grades.filter((el) => !ids.includes(el.id)))
        DeleteGrades(ids)
    }

    function OnEdit(el: Grade) {
        setCurrentGrade(el)
        let modal = new BootstrapModal(document.getElementById("grade_modal"), {})
        modal.show()
    }

    function GetValueFromField(grade: Grade,field_name: string) {
        switch (field_name) {
            case "head_id":
                let user = users.find((el) => el.id === grade.head_id)
                return `${user?.surname} ${user?.name[0]}.`
            case "student":
                return grade.student?.length
            default:
                return grade[field_name]
        }
    }

    function SortGrades(field_name: string, is_up: boolean) {
        const new_grades = grades.sort((a, b) => {
            if (GetValueFromField(a, field_name) > GetValueFromField(b, field_name)) {
                return is_up ? 1 : -1
            }
            if (GetValueFromField(a, field_name) < GetValueFromField(b, field_name)) {
                return is_up ? -1 : 1
            }
            return 0
        })
        setGrades([...new_grades])
    }

    // TODO add groups
    // TODO add pages
    return (
        <>
            <Modal title={"Класс"}
                   connected_with={"grade_modal"}>
                <Form elements={[
                    {
                        name: "name",
                        label: "Имя",
                        type: ElementType.INPUT,
                        settings: {}
                    },
                    {
                        name: "head_id",
                        label: "Руководитель",
                        type: ElementType.SMART_SELECT,
                        settings: {
                            options: GetOptionsFromUsers()
                        }
                    },
                    {
                        name: "student",
                        label: "Ученики",
                        type: ElementType.SMART_SELECT,
                        settings: {
                            options: GetStudentsOptions(),
                            multiple: true,
                            size: 10
                        }
                    }
                ]}
                      instance={currentGrade}
                      onSubmit={OnSubmit}/>
            </Modal>
            <ModalButton connected_with={"grade_modal"}
                         button_text={"Создание класса"}
                         additionalClasses={"m-3"}
                         preOpen={() => {
                             setCurrentGrade({} as Grade)
                         }}
            />
            <Table elements={grades}
                   table_fields={[
                       {label: "Имя", name: "name"},
                       {
                           label: "Руководитель", name: "head_id", valueProcessing: (el) => {
                               let res = users.find((user) => user.id === el)
                               if (res) {
                                   return `${res.surname} ${res.name[0]}.`
                               }
                           }
                       },
                       {
                           label: "Количество учащихся", name: "student", valueProcessing: (el) => {
                               return el.length
                           }
                       }
                   ]}
                   NeedDelete={true}
                   NeedEdit={true}
                   Sort={SortGrades}
                   onDelete={OnDelete}
                   onEdit={OnEdit}
            />
        </>
    )
}