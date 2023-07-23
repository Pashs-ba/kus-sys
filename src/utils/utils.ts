import {User} from "../types/types.ts";

export function GetLocalUser(): User {
    return JSON.parse(localStorage.getItem("user") || "{}")
}