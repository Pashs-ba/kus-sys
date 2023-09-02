import NavBar from "./components/UI/NavBar.tsx";
import {Outlet} from "react-router";
import SideBar from "./components/common/SideBar.tsx";

function App() {
    return (
        <>
            <NavBar title={"KysSys"} bootstrap_icon_name={"bi-cpu"}/>
            <div className={"d-flex full-height"}>
                <div className={"full-height"}>
                    <SideBar/>
                </div>
                <div className={"flex-grow-1 overflowable"}>
                    <Outlet/>
                </div>

            </div>
        </>
    )
}

export default App
