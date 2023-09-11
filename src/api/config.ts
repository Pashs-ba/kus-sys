import axios from "axios";

function ErrorToText(error_code: string){
    switch (error_code){
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
        error_message(ErrorToText(error.code))
        return Promise.reject(error);
    });
}