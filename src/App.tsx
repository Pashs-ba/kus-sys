import NavBar from "./components/UI/NavBar.tsx";
import {Outlet} from "react-router";
import SideBar from "./components/common/SideBar.tsx";
import {GetLocalUser} from "./utils/utils.ts";
import {useEffect, useState} from "react";
import {SideBarElementType} from "./types/types.ts";

function App() {
    const [SideBarElements, setSideBarElements] = useState([{text: "Домашняя страница", icon: "bi bi-house", href: "/"}] as SideBarElementType[])
    useEffect(() => {
        const user = GetLocalUser()
        if (user){
            if (user.role.includes("teacher")){
                setSideBarElements([...SideBarElements, {text: "Журнал", icon: "bi bi-book", href: "/journal"}])
            }
        }
    }, [])
    return (
        <>
            <NavBar title={"KysSys"} bootstrap_icon_name={"bi-cpu"}/>
            <div className={"d-flex full-height"}>
                <div className={"full-height"}>
                    <SideBar elements={SideBarElements}/>
                </div>
                <div className={"flex-grow-1 overflowable"}>
                    <Outlet/>
                </div>
            </div>
        </>
    )
}

export default App
