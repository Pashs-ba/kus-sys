import Card from "../../components/UI/Card.tsx";
import MessageBlock from "../../components/messages/MessageBlock.tsx";
import {Form} from "../../components/UI/Form.tsx";
import {ComboboxOptionsType, ElementType} from "../../components/UI/types.ts";

export default function FileLoader() {
    return (
        <div className={"container"}>

            <div className={"row justify-content-center align-items-center full-height"}>
                <div className="col-lg-4">
                    <Card>
                        <MessageBlock/>
                        <Form
                            elements={[
                                {
                                    name: "send_option",
                                    label: "Тип отправки",
                                    type: ElementType.COMBOBOX,
                                    settings: {
                                        options : [
                                            {
                                                id: "Тест",
                                                label: "Тест",
                                            }
                                        ] as ComboboxOptionsType[],
                                    }
                                },
                                {
                                    name: "file",
                                    label: "Файл",
                                    type: ElementType.FILE,
                                    settings: {}
                                },
                                {
                                    name: "additional_text",
                                    label: "Дополнительные данные",
                                    type: ElementType.TEXTAREA,
                                    settings: {}
                                }
                            ]}
                         onSubmit={(el)=>{
                             console.log(el)
                         }}/>
                    </Card>
                </div>
            </div>
        </div>
    )
}