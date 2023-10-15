import {CSSProperties} from "react";

type BaseElement = {
    required?: boolean
    disabled?: boolean
    additionalClasses?: string
}

export type BaseInputType = {
    simple?: boolean
    additionalClasses?: string
    label?: string
    type?: string
    value?: any
    min?: number
    max?: number
    size?: string
    onInput?: (el: any) => void
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
    accept?: string
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
    SCHEDULE,
    COMBOBOX,
    TABLE_INPUT

}

export type FormElementType = {
    name: string
    label: string
    type: ElementType
    settings: BaseInputType | BaseSelectType | BaseCheckboxType | BaseTextAreaType | BaseRadioType | BaseFileType | SmartSelectType | ComboboxFieldType
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
    checkbox?: CheckboxFieldType,
    button?: ButtonFieldType
}

export type ButtonFieldType = {
    onClick: (el: any) => void
    text?: string
    icon?: string
    type?: string
}

export type ScheduleFieldType = BaseElement & {
    value?: string,
    onInput?: (el: any) => void
}

export type ComboboxFieldType = {
    options: ComboboxOptionsType[]
    value?: string
    onInput?: (el: any) => void
}

export type ComboboxOptionsType = {
    label: string
    id: string
}

export type ServerForm = {
    userName: string,
    techName: string,
    fields: FormElementType[]
}

export type TableInputType = {
    headers: string[]
    values?: any[]
    onInput?: (el: any) => void
    vertical?: bool
}