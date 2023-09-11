import NavBar from "./components/common/NavBar.tsx";
import {Outlet} from "react-router";
import SideBar from "./components/common/SideBar.tsx";
import {GetLocalUser} from "./utils/utils.ts";
import {useEffect, useState} from "react";
import {SideBarElementType} from "./types/types.ts";
import {ConfigInterceptors} from "./api/config.ts";

function App() {
    const [SideBarElements, setSideBarElements] = useState([{
        text: "Домашняя страница",
        icon: "bi-house",
        href: "/"
    }] as SideBarElementType[])
    useEffect(() => {
        ConfigInterceptors()
        const user = GetLocalUser()
        const add = [] as SideBarElementType[]
        if (user) {
            if (user.role.includes("teacher")) {
                add.push({text: "Журнал", icon: "bi-book", href: "/journal"})
            }
            if (user.role.some(role => role.includes("add"))) {
                add.push({text: "Управление", icon: "bi-gear", href: "/admin"})
            }
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
                    <Outlet/>
                </div>
            </div>
        </>
    )
}

export default App
