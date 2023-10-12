import React from 'react'
import ReactDOM from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "bootstrap-icons/font/bootstrap-icons.css"
import "./style/style.sass"
import {Provider} from "react-redux";
import store from "./store/store.ts";
import {BrowserRouter} from "react-router-dom";
import AppRoutes from "./router/router.tsx";
import axios from "axios";
import {GetLocalUser} from "./utils/utils.ts";
axios.interceptors.request.use(function (config) {
    const user = GetLocalUser()
    config.headers["token"] = user ? user.token : ""

    return config
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <AppRoutes/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
)

