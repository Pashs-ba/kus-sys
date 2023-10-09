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
    // const [elements, setElements] = useState([])
    // useEffect(() => {
    //     setTimeout(()=>{
    //         console.log("been", GetQuestion())
    //         if (GetQuestion() && GetQuestion().type == "singl") {
    //             setElements([
    //                 {
    //                     label: "Ответ",
    //                     type: ElementType.INPUT,
    //                     name: "answer",
    //                     settings: {}
    //                 }
    //             ])
    //         }
    //     }, 500)
    //
    // }, [currentQuestion]);
    function SetQuestion() {
        if (GetQuestion() && GetQuestion().type == "singl") {
            return [
                {
                    label: "Ответ",
                    type: ElementType.INPUT,
                    name: "answer",
                    settings: {}
                }
            ] as FormElementType[]
        }
        if (GetQuestion() && GetQuestion().type == "bool"){
            return [
                {
                    label: "Ответ",
                    type: ElementType.COMBOBOX,
                    name: "answer",
                    settings: {
                        options:[
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
        }
        return [] as FormElementType[]
    }
    const Bool2Ans = {
        "true": "Да",
        "false": "Нет",
        "tru": "Да",
        "fals": "Нет",
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
                            Ответ "{GetQuestion().type=="bool"?Bool2Ans[GetQuestion().answer]:GetQuestion().answer}" на вопрос "{GetQuestion().name}" записан!
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
                                <div className="col-4">
                                    <Form elements={SetQuestion()} onSubmit={(el) => {
                                        SendAnswer(currentQuestion, el.answer).then(() => {
                                            UpdateQuestion(true)
                                            if (el.answer) {
                                                let modal = new BootstrapModal(document.getElementById("answer"), {})
                                                modal.show()
                                            }

                                        })

                                    }}
                                          additionalClassesButton={GetQuestion().answer ? "btn-outline-primary" : undefined}
                                          buttonText={GetQuestion().answer ? "Перезаписать ответ" : "Отправить ответ"}
                                          instance={{
                                              answer: GetQuestion().answer ? GetQuestion().answer : null
                                          }}/>
                                </div>

                            </div>
                        </div>
                    </>
                )
            }

        </>
    )
}