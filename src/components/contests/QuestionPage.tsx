import {Form} from "../UI/Form.tsx";
import {ElementType} from "../UI/types.ts";
import {SendAnswer} from "../../api/utils.ts";
import {Question} from "../../types/types.ts";
import Modal from "../UI/Modal.tsx";
import {Modal as BootstrapModal} from "bootstrap/dist/js/bootstrap.bundle.min.js"
export default function QuestionPage({currentQuestion, GetQuestion, UpdateQuestion}: {
    currentQuestion: Number,
    GetQuestion: () => Question,
    UpdateQuestion: (force?: boolean) => void
}) {

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
                            Ответ "{GetQuestion().answer}" на вопрос "{GetQuestion().name}" записан!
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
                                            if (el.answer){
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