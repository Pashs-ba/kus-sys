import Card from "../../components/UI/Card.tsx";
import {Form} from "../../components/UI/Form.tsx";
import {ElementType} from "../../components/UI/types.ts";
import MessageBlock from "../../components/messages/MessageBlock.tsx";
import {useDispatch} from "react-redux";
import {addMessage, addMessageWithRedirection} from "../../components/messages/messageSlice.ts";
import {Auth} from "../../api/utils.ts";

export default function Login() {
    const dispatch = useDispatch()

    function auth_processing({login, password}: { login: string, password: string }) {
        Auth({login, password}).then((user) => {
            localStorage.setItem("user", JSON.stringify(user))
            dispatch(addMessageWithRedirection({
                type: "success",
                text: "Авторизация прошла успешно"
            }))
            window.location.href = "/"
        }).catch(() => {
            dispatch(addMessage({
                type: "danger",
                text: "Неправильный логин или пароль"
            }))
        })
    }

    return (
        <div className={"full-height container"}>
            <div className="row h-100 justify-content-center align-items-center">
                <div className="col-lg-4">
                    <Card>
                        <h3>Авторизация</h3>
                        <MessageBlock/>
                        <Form
                            elements={[
                                {
                                    label: "Логин",
                                    name: "login",
                                    type: ElementType.INPUT,
                                    settings: {}
                                },
                                {
                                    label: "Пароль",
                                    name: "password",
                                    type: ElementType.INPUT,
                                    settings: {}
                                }
                            ]}
                            onSubmit={(el) => {
                                auth_processing(el)
                            }}
                            buttonText={"Войти"}/>
                        {/*TODO Translation?*/}
                        {/*TODO Loading*/}
                    </Card>
                </div>
            </div>
        </div>
    )
}