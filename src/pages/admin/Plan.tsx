import {useEffect, useState} from "react";
import {Plan, Subject} from "../../types/types";
import {CreatePlan, DeletePlans, GetAllPlans, GetAllSubjects} from "../../api/utils.ts";
import Table from "../../components/UI/Table.tsx";
import Modal from "../../components/UI/Modal.tsx";
import ModalButton from "../../components/UI/ModalButton.tsx";
import {Form} from "../../components/UI/Form.tsx";
import {ElementType, SelectNodes} from "../../components/UI/types.ts";
import {Modal as BootstrapModal} from "bootstrap/dist/js/bootstrap.bundle.min.js"

export default function Plan() {
    const [plans, setPlans] = useState([] as Plan[])
    const [subjects, setSubjects] = useState([] as Subject[])
    const [currentPlan, setCurrentPlan] = useState({} as Plan)
    useEffect(() => {
        GetAllPlans().then((res) => {
            // console.log(res)
            setPlans(res)
        })
        GetAllSubjects().then((res) => {
            setSubjects(res)
        })
    }, [])


    function GetSubjectNameById(id: number) {
        const res = subjects.find((el) => el.id === id)?.name
        if (res) {
            return res
        }
        return "Неизвестный предмет"
    }

    function onDelete(ids: number[]) {
        setPlans(plans.filter((el) => el.id ? !ids.includes(el.id) : true))
        DeletePlans(ids)
    }

    function onSubmit(el) {
        if (currentPlan.id) {
            el.id = currentPlan.id
        }
        CreatePlan(el).then(() => {
            GetAllPlans().then((res) => { //todo get by id
                setPlans(res)
            })
        })
    }

    function onEdit(el: Plan) {
        setCurrentPlan(el)
        let modal = new BootstrapModal(document.getElementById("plan_modal"), {})
        modal.show()
    }

    function GetValueFromField(plan: Plan, field_name: string) {
        if (field_name != "subject_id") {
            return plan[field_name]
        }
        return subjects.find((el) => el.id === plan.subject_id)?.name
    }

    function SortPlans(field_name: string, is_up: boolean) {
        const new_plans = plans.sort((a, b) => {

            if (GetValueFromField(a, field_name) > GetValueFromField(b, field_name)) {
                return is_up ? 1 : -1
            }
            if (GetValueFromField(a, field_name) < GetValueFromField(b, field_name)) {
                return is_up ? -1 : 1
            }
            return 0
        })
        setPlans([...new_plans])
    }


    return (
        <>
            <Modal connected_with="plan_modal" title={"План"}>
                <Form elements={[
                    {
                        label: "Название",
                        name: "name",
                        type: ElementType.INPUT,
                        settings: {required: true}
                    },
                    {
                        label: "Предмет",
                        name: "subject_id",
                        type: ElementType.SMART_SELECT,
                        settings: {
                            options: subjects.map((el) => ({value: el.id, text: el.name} as SelectNodes)),
                        }
                    },
                    {
                        label: "Файл",
                        name: "file",
                        type: ElementType.FILE,
                        settings: {required: true}
                    }
                ]}
                      instance={
                          currentPlan
                      }
                      onSubmit={onSubmit}/>
            </Modal>
            <ModalButton connected_with={"plan_modal"} button_text={"Добавить план"} additionalClasses={"m-3"}
                         preOpen={() => setCurrentPlan({} as Plan)}/>
            <Table elements={plans}
                   table_fields={[
                       {label: "Название", name: "name"},
                       {label: "Предмет", name: "subject_id", valueProcessing: GetSubjectNameById},
                   ]}
                   NeedDelete={true}
                   NeedEdit={true}
                   onDelete={onDelete}
                   onEdit={onEdit}
                   Sort={SortPlans}
            />
        </>
    )
}