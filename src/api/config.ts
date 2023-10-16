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
        if (error.response.status == 403) {
            error_message("Пожалуйста перезайдите на сайт")
            setTimeout(() => {
                // window.location.href = "/"
            }, 2000)

        }
        return Promise.reject(error);
    });

}