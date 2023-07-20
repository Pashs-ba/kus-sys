import NavBar from "./components/UI/NavBar.tsx";
import {Outlet} from "react-router";

function App() {
    return (
        <>
            <NavBar title={"KysSys"} bootstrap_icon_name={"bi-cpu"}/>
            <Outlet/>
        </>
    )
}

export default App
