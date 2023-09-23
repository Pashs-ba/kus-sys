import NavBar from "./components/common/NavBar.tsx";
import {Outlet} from "react-router";
import SideBar from "./components/common/SideBar.tsx";
import {GetLocalUser} from "./utils/utils.ts";
import {useEffect, useState} from "react";
import {SideBarElementType} from "./types/types.ts";
import {ConfigInterceptors} from "./api/config.ts";
import {useDispatch} from "react-redux";
import {addMessage} from "./components/messages/messageSlice.ts";
import MessageBlock from "./components/messages/MessageBlock.tsx";

function App() {
    const [SideBarElements, setSideBarElements] = useState([{
        text: "Домашняя страница",
        icon: "bi-house",
        href: "/"
    }] as SideBarElementType[])
    const dispatch = useDispatch()
    function ErrorMessage(message: string) {
        dispatch(addMessage({
            type: "danger",
            text: message
        }))
    }
    useEffect(() => {
        ConfigInterceptors(ErrorMessage)
        const user = GetLocalUser()
        const add = [] as SideBarElementType[]
        if (user) {
            if (user.role.includes("teacher")) {
                add.push({text: "Журнал", icon: "bi-book", href: "/journal"})
            }
            if (user.role.some(role => role.includes("add"))) {
                add.push({text: "Управление", icon: "bi-gear", href: "/admin"})
            }
            if (user.role.includes("submitor")) {
                add.push({text: "Соревнования", icon: "bi-trophy", href: "/contest"})
            }
            add.push({text: "Прочие функции", icon: "bi-card-list", href: "/other"})
        }
        setSideBarElements([...SideBarElements, ...add])
    }, [])
    return (
        <>
            <NavBar title={"KysSys"} bootstrap_icon_name={"bi-cpu"}/>
            <div className={"d-flex full-height"}>
                <div className={"full-height"}>
                    <SideBar elements={SideBarElements}/>
                </div>
                <div className={"flex-grow-1 overflowable mx-5"}>
                    <MessageBlock/>
                    <Outlet/>
                </div>
            </div>
        </>
    )
}

export default App
