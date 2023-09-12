import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Contest, Question} from "../../types/types.ts";
import {GetContestWithQuestions, GetFullQuestion, SendAnswer} from "../../api/utils.ts";
import {ContestQuestionsList} from "../../components/contests/ContestQuestionsList.tsx";
import {Form} from "../../components/UI/Form.tsx";
import {ElementType} from "../../components/UI/types.ts";

export default function ContestPage() {
    const params = useParams()
    const [contest, setContest] = useState<Contest>({} as Contest)
    const [currentQuestion, setCurrentQuestion] = useState(-1)
    useEffect(() => {
        GetContestWithQuestions(params.contest_id as Number).then((res) => {
            setContest(res)
        })
    }, []);

    function GetQuestion(): Question {
        return contest.questions?.find((el) => el.id == currentQuestion)
    }

    function UpdateQuestion(force: boolean = false) {
        if (!currentQuestion || currentQuestion == -1) return
        if (contest.questions?.find((el) => el.id == currentQuestion).legend && !force) return
        GetFullQuestion(currentQuestion).then((res) => {
            const index = contest.questions?.findIndex((el) => el.id == currentQuestion)
            setContest({
                ...contest,
                questions: [
                    ...contest.questions?.slice(0, index),
                    res,
                    ...contest.questions?.slice(index + 1)
                ]
            })
        })
    }

    useEffect(() => {
        UpdateQuestion()
    }, [currentQuestion]);

    return (
        <div className={"row h-100"} style={{maxWidth: "100%"}}>
            <div className="col-2 border-end h-100 text-center">
                <ContestQuestionsList
                    contest={contest}
                    currentQuestion={currentQuestion}
                    setCurrentQuestion={setCurrentQuestion}
                />
            </div>
            <div className={"col-10 h-100 overflow-auto"}>
                {
                    currentQuestion == -1 ? (
                        <div className={"h-100 d-flex justify-content-center align-items-center"}>
                            <i className={"bi bi-arrow-left fs-1 me-2"}/>
                            <h3 className={"m-0"}>Выберете задание из списка слева</h3>
                        </div>
                    ) : (
                        <div className={"d-flex flex-column h-100"}>
                            <h3 className={"p-3 fw-bold border-bottom"}>{GetQuestion().name}</h3>
                            <div className={"p-3 flex-grow-1 border-bottom"}
                                 dangerouslySetInnerHTML={{__html: GetQuestion().legend}}></div>
                            <div className={"my-4"}>
                                <div className="col-4">
                                    <Form elements={
                                        [
                                            {
                                                label: "Ответ",
                                                type: ElementType.INPUT,
                                                name: "answer",
                                                settings: {}
                                            }
                                        ]
                                    } onSubmit={(el) => {
                                        SendAnswer(currentQuestion, el.answer).then(() => {
                                            UpdateQuestion(true)
                                        })

                                    }}
                                    instance={{
                                        answer:GetQuestion().answer?GetQuestion().answer:null
                                    }}/>
                                </div>

                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}