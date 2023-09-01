import {User} from "../types/types.ts";

export function GetLocalUser(): User {
    return JSON.parse(localStorage.getItem("user") || "{}")
}

export function MonthNumberToName(month: number) {
    const date = new Date();
    date.setMonth(month);

    return date.toLocaleString('ru-RU', {
        month: 'long',
    });
}