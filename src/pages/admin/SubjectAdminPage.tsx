import Modal from "../../components/UI/Modal.tsx";
import ModalButton from "../../components/UI/ModalButton.tsx";
import {Form} from "../../components/UI/Form.tsx";
import {ElementType} from "../../components/UI/types.ts";
import {useEffect, useState} from "react";
import {DeleteSubjects, GetAllSubjects, SendSubject} from "../../api/utils.ts";
import {Subject} from "../../types/types.ts";
import Table from "../../components/UI/Table.tsx";
import {Modal as BootstrapModal} from "bootstrap/dist/js/bootstrap.bundle.min.js"

export default function SubjectAdminPage() {
    const [subjects, setSubjects] = useState([] as Subject[])
    const [currentSubject, setCurrentSubject] = useState({} as Subject)
    useEffect(() => {
        GetAllSubjects().then((res) => {
            setSubjects(res)
        })
    }, [])

    function onSubmit(el) {
        if (currentSubject.id) {
            el.id = currentSubject.id
        }
        SendSubject(el).then(() => {
            GetAllSubjects().then((res) => {
                setSubjects(res)
            })
        })
    }

    function SortSubjects(field: string, is_up: boolean) {
        if (is_up) {
            setSubjects([...subjects.sort((a, b) => {
                if (a[field] > b[field]) {
                    return 1
                }
                if (a[field] < b[field]) {
                    return -1
                }
                return 0
            })])
        } else {
            setSubjects([...subjects.sort((a, b) => {
                if (a[field] < b[field]) {
                    return 1
                }
                if (a[field] > b[field]) {
                    return -1
                }
                return 0
            })])
        }
    }

    return (
        <>
            <Modal title={"Предмет"} connected_with={"subject_modal"}>
                <Form
                    elements={[
                        {name: "name", label: "Название", type: ElementType.INPUT, settings: {}},
                    ]}
                    onSubmit={onSubmit}
                    instance={currentSubject}
                />
            </Modal>
            <ModalButton connected_with={"subject_modal"} button_text={"Создать предмет"}
                         additionalClasses={"m-3"}
                         preOpen={() => {
                             setCurrentSubject({} as Subject)
                         }}/>
            <Table
                elements={subjects}
                table_fields={[
                    {label: "Название", name: "name"},
                ]}
                onEdit={(el) => {
                    setCurrentSubject(el)
                    let modal = new BootstrapModal(document.getElementById("subject_modal"), {})
                    modal.show()
                }}
                Sort={SortSubjects}
                NeedEdit={true}
                NeedDelete={true}
                onDelete={(ids: number[]) => {
                    DeleteSubjects(ids).then(() => {
                        GetAllSubjects().then((res) => {
                            setSubjects(res)
                        })
                    })
                }}
            />
        </>
    )
}