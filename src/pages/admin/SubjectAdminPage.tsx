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
    const [current_subject, setCurrentSubject] = useState({} as Subject)
    useEffect(() => {
        GetAllSubjects().then((res) => {
            setSubjects(res)
        })
    }, [])

    function onSubmit(el) {
        if (current_subject.id) {
            el.id = current_subject.id
        }
        SendSubject(el).then(() => {
            GetAllSubjects().then((res) => {
                setSubjects(res)
            })
        })
    }

    return (
        <>
            <Modal title={"Предмет"} connected_with={"subject_modal"}>
                <Form
                    elements={[
                        {name: "name", label: "Название", type: ElementType.INPUT, settings: {}},
                    ]}
                    onSubmit={onSubmit}
                    instance={current_subject}
                />
            </Modal>
            <ModalButton connected_with={"subject_modal"} button_text={"Создать предмет"} additionalClasses={"m-3"}
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