import axios from "axios";
import {GetLocalUser} from "../utils/utils.ts";
import {DEBUG} from "../config.ts";

function ErrorToText(error_code: string) {
    switch (error_code) {
        case "ERR_NETWORK":
            return "Упс! Страница не загружается… Проверьте интернет или попробуйте позже. Извините за неудобства!" //todo add more
        default:
            return "Что-то пошло не так..."
    }
}


export function ConfigInterceptors(error_message: (message: string) => void) {
    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        // console.log(error)
        // if (error.response.status == 401) return Promise.reject(error);
        // if (error.response.status == 409) error_message(error.response.data)
        // else {
        //     error_message(ErrorToText(error.code))
        // }
        if (error.response.status == 403){
            localStorage.removeItem("user")
            error_message("Пожалуйста перезайдите на сайт")
            setTimeout(() => {
                window.location.href = "/"
            }, 2000)

        }
        return Promise.reject(error);
    });
    axios.interceptors.request.use(function (config) {
        const user = GetLocalUser()
        if (!DEBUG){
            config.headers["token"] = user?user.token:""
        }

        // console.log(config)
        return config
    })
}