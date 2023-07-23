import {Form} from "../../components/UI/Form.tsx";
import {ElementType} from "../../components/UI/types.ts";
import Card from "../../components/UI/Card.tsx";
import {useEffect, useState} from "react";
import {GetAllJournals} from "../../api/utils.ts";
import {GetLocalUser} from "../../utils/utils.ts";
import {Journal} from "../../types/types.ts";
import LoadingComponent from "../../components/UI/LoadingComponent.tsx";
import {SelectNodes} from "../../components/UI/types.ts";
import {useDispatch} from "react-redux";
import MessageBlock from "../../components/messages/MessageBlock.tsx";
import {addMessage} from "../../components/messages/messageSlice.ts";
import {useNavigate} from "react-router";

export default function SelectJournalPage() {
    const user = GetLocalUser()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [journals, setJournals] = useState<Journal[]>([])
    useEffect(() => {
        GetAllJournals({teacher_id: user.id}).then((journals) => {
            setJournals(journals)
        })
    }, [])

    function GetGradesFromJournals(journals: Journal[]): SelectNodes[] {
        return journals.map((el) => {
            return {
                text: el.grade.toString(),
                value: el.grade.toString(),
            } as SelectNodes
        })
    }

    function GetSubjectsFromJournals(journals: Journal[]): SelectNodes[] {
        return journals.map((el) => {
            return {
                text: el.subject,
                value: el.subject,
            } as SelectNodes
        })
    }

    function GetJournal({grade, subject}: { grade: number, subject: string }) {
        const result = journals.filter((el) => {
            return el.grade === grade && el.subject === subject
        })
        if (result.length == 0) {
            dispatch(addMessage({
                type: "danger",
                text: "Нет журнала для этого класса и предмета"
            }))
        } else {
            navigate(`/journal/${result[0].id}`)
        }
    }

    return (
        <div className={"container"}>

            <div className={"row justify-content-center align-items-center full-height"}>
                <div className="col-lg-4">

                    <Card>
                        <MessageBlock/>
                        {
                            journals.length > 0 ?
                                <Form
                                    additionalClasses={"mt-3"}
                                    elements={[
                                        {
                                            type: ElementType.SMART_SELECT,
                                            name: "grade",
                                            label: "Класс",
                                            settings: {
                                                options: [
                                                    ...GetGradesFromJournals(journals)
                                                ]
                                            }
                                        },
                                        {
                                            type: ElementType.SMART_SELECT,
                                            name: "subject",
                                            label: "Предмет",
                                            settings: {
                                                options: [
                                                    ...GetSubjectsFromJournals(journals)
                                                ]
                                            }
                                        }
                                    ]}
                                    onSubmit={(el) => {
                                        GetJournal({grade: el.grade, subject: el.subject})
                                    }}
                                    buttonText={"Открыть журнал"}
                                /> : <LoadingComponent/>
                        }

                    </Card>
                </div>
            </div>
        </div>
    )
}