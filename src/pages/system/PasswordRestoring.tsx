import {Form} from "../../components/UI/Form.tsx";
import {ElementType} from "../../components/UI/types.ts";
import Card from "../../components/UI/Card.tsx";

export default function PasswordRestoring() {
    return (
        <div className={"full-height container"}>
            <div className="row h-100 justify-content-center align-items-center">
                <div className="col-lg-4">
                    <Card>
                        <h3>Восстановление пароля</h3>
                        <Form
                            elements={[
                                {
                                    label: "Электропочта",
                                    name: "email",
                                    type: ElementType.INPUT,
                                    settings: {type: "email"}
                                }
                            ]} onSubmit={(el) => {
                            return el
                        }}/>
                    </Card>
                </div>
            </div>
        </div>
    )
}