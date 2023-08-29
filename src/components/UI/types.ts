import {CSSProperties} from "react";

type BaseElement = {
    required?: boolean
    disabled?: boolean
    additionalClasses?: string
}

export type BaseInputType = BaseElement & {
    placeholder?: string,
    value?: any
    type?: string,
    min?: number,
    max?: number
    onInput?: (el: any) => void
    onKeyPress?: (el: any) => void
    size?: number
}

export type SelectNodes = {
    disabled?: boolean
    selected?: boolean
    text: string
    value: string
    style?: CSSProperties
}

export type BaseSelectType = BaseElement & {
    options: SelectNodes[],
    multiple?: boolean
    size?: number
    onSelect?: (el: any) => void,
    value?: any
}
export type BaseCheckboxType = BaseElement & {
    checked?: boolean,
    onCheck?: (el: any) => void
}

export type BaseTextAreaType = BaseElement & {
    value?: any
    rows?: number
    cols?: number
    onInput?: (el: any) => void
}

export type BaseRadioType = BaseElement & {
    connect_with?: string
    checked?: boolean
    onCheck?: (el: any) => void
}
export type BaseFileType = BaseElement & {
    multiple?: boolean
    onInput?: (el: any) => void
    url?: string
}

export type SmartSelectType = BaseSelectType & {
    initialSearch?: string
}

export enum ElementType {
    INPUT,
    SELECT,
    CHECKBOX,
    TEXTAREA,
    RADIO,
    FILE,
    SMART_SELECT,
    SCHEDULE
}

export type FormElementType = {
    name: string
    label: string
    type: ElementType
    settings: BaseInputType | BaseSelectType | BaseCheckboxType | BaseTextAreaType | BaseRadioType | BaseFileType | SmartSelectType
}

export type FormType = {
    elements: FormElementType[],
    additionalClassesButton?: string,
    additionalClasses?: string
    buttonText?: string,
    onSubmit: (el: any) => void
    horizontal?: boolean,
    instance?: any
}
export type CheckboxFieldType = {
    onButtonClick: (el: any) => void
    btn_type?: string
}

export type TableFieldType = {
    name: string
    label: string
    valueProcessing?: (el: any) => any
    width?: number
    sortDown?: boolean
    show_arrow?: boolean
    checkbox?: CheckboxFieldType
}



export type ScheduleFieldType = BaseElement & {
    value?: string,
    onInput?: (el: any) => void
}