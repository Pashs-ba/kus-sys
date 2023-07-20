import {lazy, Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import LoadingPage from "../pages/system/LoadingPage.tsx";
import Tester from "./Tester.tsx";
import NotFound from "../pages/system/NotFound.tsx";

export default function AppRoutes() {
    const App = lazy(() => import("../App.tsx"));
    const HomePage = lazy(() => import("../pages/HomePage.tsx"));
    return (
        <Suspense fallback={<LoadingPage/>}>
            <Routes>
                <Route path={"/"} element={<App/>}>
                    <Route
                        element={
                            <Tester navigate_in_fail={"/login"}
                                    test_function={() => true}/> // TODO: replace
                        }>
                        <Route index element={<HomePage/>}/>
                    </Route>
                    {/*<Route element={*/}
                    {/*    <Tester navigate_in_fail={"/"}*/}
                    {/*            test_function={alreadyAuthenticated}/>*/}
                    {/*}>*/}
                    {/*    <Route path={"login"} element={<Login/>}/>*/}
                    {/*</Route>*/}
                    <Route path={"*"} element={<NotFound/>}/>
                </Route>
            </Routes>
        </Suspense>
    )
}