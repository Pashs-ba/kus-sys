export enum MessagesType {
    SUCCESS = "success",
    ERROR = "error",
    WARNING = "warning",
    INFO = "info",
    DANGER = "danger"
}
export type Message = {
    text: string
    constant?: boolean
    type?: MessagesType
    need_to_delete?: boolean
    debug_fix?: boolean // https://bit.ly/3pDRHjv
}