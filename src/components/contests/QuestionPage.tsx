import {Form} from "../UI/Form.tsx";
import {ElementType, FormElementType} from "../UI/types.ts";
import {SendAnswer} from "../../api/utils.ts";
import {Question} from "../../types/types.ts";
import Modal from "../UI/Modal.tsx";
import {Modal as BootstrapModal} from "bootstrap/dist/js/bootstrap.bundle.min.js"
import {useEffect, useState} from "react";

export default function QuestionPage({currentQuestion, GetQuestion, UpdateQuestion}: {
    currentQuestion: Number,
    GetQuestion: () => Question,
    UpdateQuestion: (force?: boolean) => void
}) {
    function SetQuestion() {
        if (!GetQuestion()) return [] as FormElementType[]

        switch (GetQuestion().type) {
            case "singl":
                return [
                    {
                        label: "Ответ",
                        type: ElementType.INPUT,
                        name: "answer",
                        settings: {}
                    }
                ] as FormElementType[]
            case "bool":
                return [
                    {
                        label: "Ответ",
                        type: ElementType.COMBOBOX,
                        name: "answer",
                        settings: {
                            options: [
                                {
                                    id: "true",
                                    label: "Да"
                                },
                                {
                                    id: "false",
                                    label: "Нет"
                                }
                            ]
                        }
                    }
                ] as FormElementType[]
            case "table":
                return [
                    {
                        label: "Ответ",
                        type: ElementType.TABLE_INPUT,
                        name: "answer",
                        settings: {
                            headers: [
                                ...GetQuestion()?.ans_list
                            ],
                        }
                    }
                ] as FormElementType[]
            case "vertical_table":
                return [
                    {
                        label: "Ответ",
                        type: ElementType.TABLE_INPUT,
                        name: "answer",
                        settings: {
                            headers: [
                                ...GetQuestion()?.ans_list
                            ],
                            vertical: true
                        }
                    }
                ] as FormElementType[]
            case "check":
                return GetQuestion().ans_list.map((el, index) => {
                    return {
                        label: `${index + 1}. ${el}`,
                        type: ElementType.CHECKBOX,
                        name: String(index),
                        settings: {}
                    } as FormElementType
                })
            case "radio":
                return GetQuestion().ans_list.map((el, index) => {
                    return {
                        label: `${index + 1}. ${el}`,
                        type: ElementType.RADIO,
                        name: String(index),
                        settings: {
                            connect_with: `${GetQuestion().id}`
                        }
                    } as FormElementType
                })
            default:
                return [] as FormElementType[]
        }

    }

    function InstanceProcessing(answer?: string) {
        switch (GetQuestion().type) {
            case "table":
            case "vertical_table":
                return {
                    answer: answer ? answer.split(",") : null
                }
            case "check":
            case "radio":
                let instance = {}
                if (answer != null) {
                    answer.split(",").map((el) => {
                        instance[el] = true
                    })
                }
                return instance
            default:
                return {
                    answer: answer ? answer : null
                }
        }
    }

    function AnswerProcessing(answer: string | string[] | null | any) {
        if (!answer) return ""
        switch (GetQuestion().type) {
            case "table":
            case "vertical_table":
                return (answer as string[]).join(",")
            case "check":
            case "radio":
                return Object.keys(answer).filter(el => answer[el]).join(",")
            default:
                return answer.answer as string
        }
    }

    const Bool2Ans = {
        "true": "Да",
        "false": "Нет",
        "tru": "Да",
        "fals": "Нет",
    }

    const Type2Size = {
        "singl": "col-4",
        "multi": "col-4",
        "table": "col-12",
        "bool": "col-4",
    }
    return (
        <>
            {
                currentQuestion == -1 ? (
                    <div className={"h-100 d-flex justify-content-center align-items-center"}>
                        <i className={"bi bi-arrow-left fs-1 me-2"}/>
                        <h3 className={"m-0"}>Выберете задание из списка слева</h3>
                    </div>
                ) : (
                    <>
                        <Modal title={"Ответ записан"} connected_with={"answer"}>
                            Ответ
                            "{GetQuestion().type == "bool" ? Bool2Ans[GetQuestion().answer] : GetQuestion().answer}"
                            на
                            вопрос "{GetQuestion().name}" записан!
                        </Modal>
                        <div className={"d-flex flex-column h-100"}>
                            <div className=" p-3 d-flex align-items-center border-bottom">
                                <h3 className={"fw-bold m-0 me-3"}>{GetQuestion().name}</h3>
                                {
                                    GetQuestion().answer ? (
                                        <p className={"text-secondary m-0"}><i className="bi bi-check-circle me-1"></i>Ответ
                                            сохранен</p>
                                    ) : null
                                }

                            </div>

                            <div className={"p-3 flex-grow-1 border-bottom"}
                                 dangerouslySetInnerHTML={{__html: GetQuestion().legend}}></div>
                            <div className={"my-4 row"}>
                                <div className={Type2Size[GetQuestion().type]}>
                                    <Form elements={SetQuestion()}
                                          onSubmit={(el) => {
                                              let ans
                                              if (["table", "vertical_table"].includes(GetQuestion().type)) {
                                                  ans = AnswerProcessing(el.answer)
                                              } else {
                                                  ans = AnswerProcessing(el)
                                              }
                                              SendAnswer(currentQuestion, ans).then(() => {
                                                  UpdateQuestion(true)
                                                  if (ans) {
                                                      let modal = new BootstrapModal(document.getElementById("answer"), {})
                                                      modal.show()
                                                  }
                                              })

                                          }}
                                          additionalClassesButton={GetQuestion().answer ? "btn-outline-primary" : undefined}
                                          buttonText={GetQuestion().answer ? "Перезаписать ответ" : "Отправить ответ"}
                                          instance={InstanceProcessing(GetQuestion().answer)}
                                    />
                                </div>

                            </div>
                        </div>
                    </>
                )
            }

        </>
    )
}