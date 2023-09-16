import Card from "../../components/UI/Card.tsx";
import {Form} from "../../components/UI/Form.tsx";
import {ElementType} from "../../components/UI/types.ts";
import {useDispatch} from "react-redux";
import {addMessage} from "../../components/messages/messageSlice.ts";
import {Link} from "react-router-dom";

export default function Registration() {
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
                            }
                        ]}
                              onSubmit={(el)=>{
                                  if (el.password !== el.password2) {
                                      dispatch(addMessage({
                                          type: "danger",
                                          text: "Пароли не совпадают"
                                      }))
                                  }
                              }}
                              buttonText={"Зарегистрироваться"}/>
                        <p className={"text-secondary m-0 mt-3"}>Уже есть аккаунт? <Link to={"/login"}>Войти</Link></p>
                    </Card>
                </div>
            </div>
        </div>
    )
}