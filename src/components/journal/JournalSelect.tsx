import {ElementType, SelectNodes} from "../UI/types.ts";
import {Form} from "../UI/Form.tsx";
import {useEffect, useState} from "react";
import {Journal} from "../../types/types.ts";
import {GetAllJournals} from "../../api/utils.ts";
import {GetLocalUser} from "../../utils/utils.ts";
import LoadingComponent from "../UI/LoadingComponent.tsx";

export default function JournalSelect({GetJournal}: { GetJournal: (result: Journal[]) => void }) {
    const [journals, setJournals] = useState<Journal[]>([{id: -1, grade: -1, subject: ""}])
    const user = GetLocalUser()

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

    return (
        <>
            {journals[0] ?
                journals[0].id !== -1 ? (
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
                            GetJournal(journals.filter((journal) => {
                                return journal.grade === el.grade && journal.subject === el.subject
                            }))
                        }}
                        buttonText={"Открыть журнал"}
                    />) : <LoadingComponent/>
                : (
                    <h3 className={"text-center m-0"}>У вас нет журналов!</h3>
                )
            }
        </>

        //
    )
}