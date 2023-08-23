import Table from "../../components/UI/Table.tsx";
import {useEffect, useState} from "react";
import {DeleteUsers, GetAllUsers, SendUserFile} from "../../api/utils.ts";
import {User} from "../../types/types.ts";
import MessageBlock from "../../components/messages/MessageBlock.tsx";
import Modal from "../../components/UI/Modal.tsx";
import ModalButton from "../../components/UI/ModalButton.tsx";
import {Form} from "../../components/UI/Form.tsx";
import {ElementType} from "../../components/UI/types.ts";
import {SendUser} from "../../api/utils.ts";
import {GetLocalUser} from "../../utils/utils.ts";
import {Modal as BootstrapModal} from "bootstrap/dist/js/bootstrap.bundle.min.js"


export default function User() {
    const [users, setUsers] = useState([] as User[]);
    const [current_user, setCurrentUser] = useState({} as User)
    const local_user = GetLocalUser()
    useEffect(() => {
        GetAllUsers().then((res) => {
            setUsers(res)
        })
    }, []);

    function GetFormattedRole(role: string) {
        switch (role) {
            case "admin":
                return "Администратор"
            case "teacher":
                return "Преподаватель"
            case "student":
                return "Студент"
            case "submitor":
                return "Участник соревнований"
            default:
                return role
        }
    }

    function onDelete(ids: number[]) {
        setUsers(users.filter((el) => !ids.includes(el.id)))
        DeleteUsers(ids)
    }

    function createUser(el: User) {
        el.school_id = local_user.school_id //todo change?
        if (current_user.id) {
            el.id = current_user.id
        }
        SendUser(el).then(() => {
            GetAllUsers().then((res) => {
                setUsers(res)
            })
        })
    }

    function openModal(user: User) {
        setCurrentUser(user)
        let modal = new BootstrapModal(document.getElementById("user_modal"), {})
        modal.show()
    }

    function SortUsers(field_name: string, is_up: boolean) {
        const new_users = users.sort((a, b) => {
            if (a[field_name] > b[field_name]) {
                return is_up ? 1 : -1
            }
            if (a[field_name] < b[field_name]) {
                return is_up ? -1 : 1
            }
            return 0
        })
        setUsers([...new_users])
    }

    return (
        <>
            <MessageBlock/>
            <Modal connected_with={"user_modal"} title={"Юзер"}>
                <Form
                    elements={[
                        {
                            name: "name",
                            label: "Имя",
                            type: ElementType.INPUT,
                            settings: {}
                        },
                        {
                            name: "surname",
                            label: "Фамилия",
                            type: ElementType.INPUT,
                            settings: {}
                        },
                        {
                            name: "login",
                            label: "Логин",
                            type: ElementType.INPUT,
                            settings: {}
                        },
                        {
                            name: "password",
                            label: "Пароль",
                            type: ElementType.INPUT,
                            settings: {}
                        },
                        {
                            name: "role",
                            label: "Роль",
                            type: ElementType.SELECT,
                            settings: {
                                options: [
                                    {value: "admin", text: "Администратор"},
                                    {value: "teacher", text: "Преподаватель"},
                                    {value: "student", text: "Студент"},
                                    {value: "submitor", text: "Участник соревнований"},
                                ],
                                multiple: true
                            }
                        }
                    ]}
                    instance={current_user}
                    onSubmit={createUser}
                    buttonText={"Отправить"}
                />
            </Modal>
            <ModalButton connected_with={"user_modal"}
                         additionalClasses={"m-3"}
                         preOpen={() => {
                             setCurrentUser({} as User)
                         }}
                         button_text={"Создание юзера"}/>
            <Modal connected_with={"multiple_users_modal"} title={"Загрузка через файл"}>
                <Form elements={[
                    {name: "file", label: "Файл", type: ElementType.FILE, settings: {}}
                ]}
                      onSubmit={(el) => {
                          SendUserFile(el.file)
                      }}/>
            </Modal>
            <ModalButton connected_with={"multiple_users_modal"} button_text={"Загрузить через файл"}/>
            <Table elements={users}
                   additional_classes="mt-3"
                   table_fields={[
                       {name: "name", label: "Имя"},
                       {name: "surname", label: "Фамилия"},
                       {name: "login", label: "Логин"},
                       {name: "password", label: "Пароль"},
                       {
                           name: "role",
                           label: "Роль",
                           valueProcessing: (value: string[]) => {
                               return value.map((el) => GetFormattedRole(el)).join(", ")
                           },
                           width: 20,
                       },
                   ]}
                   NeedEdit={true}
                   NeedDelete={true}
                   onEdit={openModal}
                   onDelete={onDelete}
                   Sort={SortUsers}
            />
        </>
    )
}