import Card from "../../components/UI/Card.tsx";
import {Form} from "../../components/UI/Form.tsx";
import {ElementType} from "../../components/UI/types.ts"
import {useDispatch} from "react-redux";
import {addMessage} from "../../components/messages/messageSlice.ts";
import {Link} from "react-router-dom";
import {RegistrationSend} from "../../api/utils.ts";
import {useNavigate} from "react-router";

export default function Registration() {
    const navigate = useNavigate()
    function SendRegistration(el: any){
        if (el.password !== el.password2) {
            dispatch(addMessage({
                type: "danger",
                text: "Пароли не совпадают"
            }))
            return;
        }
        RegistrationSend(el).then(()=>{
            dispatch(addMessage(
                {
                    type: "success",
                    text: "Регистрация прошла успешно. Проверьте почту"
                }
            ))
            navigate("/login")
        }).catch((err)=>{
            dispatch(addMessage(
                {
                    type: "danger",
                    text: "Что то пошло не так"
                }
            ))
        })
    }
    const dispatch = useDispatch()
    return (
        <div className={"full-height container"}>
            <div className="row h-100 justify-content-center align-items-center">
                <div className="col-lg-4">
                    <Card>
                        <h3>Регистрация</h3>
                        <Form elements={[
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
                                settings: {
                                    type: "password"
                                }
                            },
                            {
                                label: "Повторите пароль",
                                name: "password2",
                                type: ElementType.INPUT,
                                settings: {
                                    type: "password"
                                }
                            },
                            {
                                label: "Электропочта",
                                name: "email",
                                type: ElementType.INPUT,
                                settings: {
                                    type: "email"
                                }
                            },
                            {
                                label: "Дополнительный код (необязательно)",
                                name: "key",
                                type: ElementType.INPUT,
                                settings: {}
                            }
                        ]}
                              onSubmit={SendRegistration}
                              buttonText={"Зарегистрироваться"}/>
                        <p className={"text-secondary m-0 mt-3"}>Уже есть аккаунт? <Link to={"/login"}>Войти</Link></p>
                    </Card>
                </div>
            </div>
        </div>
    )
}