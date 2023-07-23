import {User} from "../types/types.ts";
import axios from "axios";
import {API_PATH} from "../config.ts";

export function Auth({login, password}: { login: string, password: string }) {
    return new Promise<User>((resolve, reject) => {
        axios.post(`${API_PATH}/login`, {login, password}).then((res) => {
            resolve(res.data.user as User)
        }).catch((err) => {
            reject(err)
        })
    })
}
