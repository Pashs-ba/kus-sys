import {lazy, Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import LoadingPage from "../pages/system/LoadingPage.tsx";
import Tester from "./Tester.tsx";
import NotFound from "../pages/system/NotFound.tsx";
import {User} from "../types/types.ts";

function isAuthenticated(): boolean {
    const user: User = JSON.parse(localStorage.getItem("user") as string);
    return !!user
}

function isTeacher(): boolean {
    const user: User = JSON.parse(localStorage.getItem("user") as string);
    return user.role.includes("teacher")
}

export default function AppRoutes() {
    const App = lazy(() => import("../App.tsx"));
    const HomePage = lazy(() => import("../pages/HomePage.tsx"));
    const Login = lazy(() => import("../pages/system/Login.tsx"));
    const SelectJournalPage = lazy(() => import("../pages/journal/SelectJournalPage.tsx"));
    const JournalPage = lazy(() => import("../pages/journal/JournalPage.tsx"));
    const User = lazy(() => import("../pages/admin/User.tsx"));
    const Plan = lazy(() => import("../pages/admin/Plan.tsx"));
    const Grade = lazy(() => import("../pages/admin/Grade.tsx"));
    const Journal = lazy(() => import("../pages/admin/Journal.tsx"));
    const AdminRoot = lazy(() => import("../pages/admin/AdminRoot.tsx"));
    return (
        <Suspense fallback={<LoadingPage/>}>
            <Routes>
                <Route path={"/"} element={<App/>}>
                    <Route
                        element={
                            <Tester navigate_in_fail={"/login"}
                                    test_function={isAuthenticated}/>
                        }>
                        <Route index element={<HomePage/>}/>
                        <Route element={
                            <Tester navigate_in_fail={"/"} test_function={isTeacher}/>
                        }>
                            <Route path={"journal"} element={<SelectJournalPage/>}/>
                            <Route path={"journal/:journal_id"} element={<JournalPage/>}/>
                            <Route path={"admin"} element={<AdminRoot/>}/>
                            <Route path={"admin/user"} element={<User/>}/>
                            <Route path={"admin/plan"} element={<Plan/>}/>
                            <Route path={"admin/grade"} element={<Grade/>}/>
                            <Route path={"admin/journal"} element={<Journal/>}/>
                        </Route>
                    </Route>
                    <Route element={
                        <Tester navigate_in_fail={"/"}
                                test_function={() => {
                                    return !isAuthenticated()
                                }}/>
                    }>
                        <Route path={"login"} element={<Login/>}/>
                    </Route>
                    <Route path={"*"} element={<NotFound/>}/>
                </Route>
            </Routes>
        </Suspense>
    )
}