import Card from "../../components/UI/Card.tsx";
import MessageBlock from "../../components/messages/MessageBlock.tsx";
import {Form} from "../../components/UI/Form.tsx";
import {ComboboxOptionsType, ElementType, ServerForm} from "../../components/UI/types.ts";
import {useEffect, useState} from "react";
import {GetForms, SendForms} from "../../api/utils.ts";
import ComboBox from "../../components/UI/ComboBox.tsx";
import Modal from "../../components/UI/Modal.tsx";
import {Modal as BootstrapModal} from "bootstrap/dist/js/bootstrap.bundle.min.js"

export default function FileLoader() {
    const [serverForms, setServerForms] = useState<ServerForm[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [result, setResult] = useState("")
    useEffect(() => {

        GetForms().then((el) => {
            setServerForms(el)
        })
    }, []);
    return (
        <div className={"container"}>
            <Modal connected_with={"result"} title={"Результат"} additional_classes={"modal-lg"}>
                <div dangerouslySetInnerHTML={{__html: result}}></div>
            </Modal>
            <div className={"row justify-content-center align-items-center full-height"}>
                <div className="col-lg-4">
                    <Card>

                        {
                            serverForms.length > 0 ? (
                                <>
                                    <div className={"mb-3"}>
                                        <ComboBox
                                            label={"Выберите форму"}
                                            real_options={
                                                serverForms.map((el) => {
                                                    return el.userName
                                                })
                                            }
                                            value={serverForms[0].userName}
                                            onInput={(el) => {
                                                if (el) {
                                                    setCurrentIndex(serverForms.findIndex((form) => {
                                                        return form.userName === el
                                                    }))
                                                }

                                            }}
                                        />
                                    </div>
                                    <Form elements={
                                        serverForms[currentIndex].fields
                                    } onSubmit={
                                        (el)=>{
                                            SendForms(serverForms[currentIndex].techName, el).then((res)=>{
                                                setResult(res)
                                                let modal = new BootstrapModal(document.getElementById("result"), {})
                                                modal.show()
                                            })
                                        }

                                    }/>
                                </>
                            ) : null
                        }
                    </Card>
                </div>
            </div>
        </div>
    )
}