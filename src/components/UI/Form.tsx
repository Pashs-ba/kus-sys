'use client';

import {
    BaseCheckboxType,
    BaseFileType,
    BaseInputType,
    BaseRadioType,
    BaseSelectType,
    BaseTextAreaType,
    ElementType,
    FormElementType,
    FormType,
    SmartSelectType
} from "./types.ts";
import {ReactElement, useEffect, useState} from "react";
import BaseInput from "./BaseInput.tsx";
import BaseSelect from "./BaseSelect.tsx";
import {BaseCheckbox} from "./BaseCheckbox.tsx";
import {BaseTextArea} from "./BaseTextArea.tsx";
import BaseRadio from "./BaseRadio.tsx";
import BaseFile from "./BaseFile.tsx";
import SmartSelect from "./SmartSelect.tsx";

export function Form({
                         elements,
                         additionalClasses,
                         buttonText,
                         onSubmit
                     }: FormType) {
    const [form_values, change_form_values] = useState({})

    function get_value_from_select(el: FormElementType) {
        let settings = el.settings as BaseSelectType
        let ans = settings.multiple ? [] as string[] : settings.options[0].value
        settings.options.map((option) => {
            if (option.selected) {
                if (settings.multiple) {
                    (ans as string[]).push(option.value)
                } else {
                    ans = option.value
                }
            }
        })
        return ans
    }

    function get_value(el: FormElementType): any {
        switch (el.type) {
            case ElementType.INPUT:
                return (el.settings as BaseInputType).value ? (el.settings as BaseInputType).value : "";
            case ElementType.SELECT:
                return get_value_from_select(el)
            case ElementType.CHECKBOX:
                return (el.settings as BaseCheckboxType).checked === undefined ? false : (el.settings as BaseCheckboxType).checked
            case ElementType.TEXTAREA:
                return (el.settings as BaseTextAreaType).value ? (el.settings as BaseInputType).value : "";
            case ElementType.RADIO:
                return (el.settings as BaseRadioType).checked === undefined ? false : (el.settings as BaseCheckboxType).checked
            case ElementType.FILE:
                return null
            case ElementType.SMART_SELECT:
                return get_value_from_select(el)
        }
    }

    useEffect(() => {
        let changes: any = {}
        elements.map((el) => {
            changes[el.name] = get_value(el)
        })
        change_form_values({...form_values, ...changes})
    }, [])

    function element_value_change(el: any, name: string) {
        change_form_values({...form_values, [name]: el})
    }

    function create_input(settings: BaseInputType, name: string) {
        return (
            <BaseInput placeholder={settings.placeholder}
                       value={settings.value}
                       disabled={settings.disabled}
                       type={settings.type}
                       min={settings.min}
                       max={settings.max}
                       required={settings.required}
                       additionalClasses={settings.additionalClasses}
                       onInput={(el) => {
                           element_value_change(el.currentTarget.value, name)
                       }}
            />
        )
    }

    function on_select_processing(el: any, name: string, settings: BaseSelectType | SmartSelectType) {
        if (settings.multiple) {
            element_value_change(
                Array.from(el.currentTarget.selectedOptions, (element: any) => element.value),
                name
            )
        } else {
            element_value_change(
                el.currentTarget.selectedOptions[0].value,
                name
            )
        }
    }

    function create_select(settings: BaseSelectType, name: string) {
        return (
            <BaseSelect
                options={settings.options}
                additionalClasses={settings.additionalClasses}
                disabled={settings.disabled}
                required={settings.required}
                multiple={settings.multiple}
                size={settings.size}
                onSelect={(el) => {
                    on_select_processing(el, name, settings)
                }}
            />
        )
    }

    function create_radio(settings: BaseRadioType, name: string) {
        return (
            <BaseRadio connect_with={settings.connect_with}
                       required={settings.required}
                       disabled={settings.disabled}
                       additionalClasses={settings.additionalClasses}
                       checked={settings.checked}
                       onCheck={(el) => {
                           element_value_change(el.currentTarget.checked, name)
                       }}/>
        )
    }

    function create_checkbox(settings: BaseCheckboxType, name: string) {
        return (
            <BaseCheckbox
                required={settings.required}
                checked={settings.checked}
                disabled={settings.disabled}
                additionalClasses={settings.additionalClasses}
                onCheck={(el) => {
                    element_value_change(el.currentTarget.checked, name)
                }}
            />
        )
    }

    function create_textarea(settings: BaseTextAreaType, name: string) {
        return (
            <BaseTextArea
                required={settings.required}
                disabled={settings.disabled}
                additionalClasses={settings.additionalClasses}
                value={settings.value}
                rows={settings.rows}
                cols={settings.cols}
                onInput={(el) => {
                    element_value_change(el.currentTarget.value, name)
                }}
            />
        )
    }

    function create_file(settings: BaseFileType, name: string) {
        return (
            <BaseFile
                required={settings.required}
                disabled={settings.disabled}
                additionalClasses={settings.additionalClasses}
                multiple={settings.multiple}
                onInput={(el) => {
                    if (settings.multiple) {
                        element_value_change(el.target.files, name)
                    } else {
                        element_value_change(el.target.files[0], name)
                    }
                }}
            />
        )
    }

    function create_smart_select(settings: SmartSelectType, name: string) {
        return (
            <SmartSelect options={settings.options}
                         additionalClasses={settings.additionalClasses}
                         disabled={settings.disabled}
                         size={settings.size}
                         required={settings.required}
                         onSelect={(el) => {
                             on_select_processing(el, name, settings)
                         }}
                         multiple={settings.multiple}
                         initialSearch={settings.initialSearch}
            />
        )
    }

    const form_elements = elements.map((element) => {
        let rendered_element: ReactElement
        switch (element.type) {
            case ElementType.INPUT:
                rendered_element = create_input(element.settings as BaseInputType, element.name)
                break
            case ElementType.SELECT:
                rendered_element = create_select(element.settings as BaseSelectType, element.name)
                break
            case ElementType.CHECKBOX:
                rendered_element = create_checkbox(element.settings as BaseCheckboxType, element.name)
                break
            case ElementType.TEXTAREA:
                rendered_element = create_textarea(element.settings as BaseTextAreaType, element.name)
                break
            case ElementType.RADIO:
                rendered_element = create_radio(element.settings as BaseRadioType, element.name)
                break
            case ElementType.FILE:
                rendered_element = create_file(element.settings as BaseFileType, element.name)
                break
            case ElementType.SMART_SELECT:
                rendered_element = create_smart_select(element.settings as SmartSelectType, element.name)
                break
        }
        if (element.type == ElementType.CHECKBOX || element.type == ElementType.RADIO) {
            return (
                <div className={"mb-3 form-check"} key={element.name}>
                    {rendered_element}
                    <label className={"form-check-label"}>{element.label}</label>
                </div>
            )
        } else {
            return (
                <div className={"mb-3"} key={element.name}>
                    <label className={"form-label"}>{element.label}</label>
                    {rendered_element}
                </div>
            )

        }
    })

    return (
        <form>
            {form_elements}
            <button
                className={`btn btn-primary ${additionalClasses}`}
                onClick={(el) => {
                    el.preventDefault()
                    onSubmit(form_values)
                }}
                data-bs-dismiss="modal"
            >
                {buttonText ? buttonText : "Submit"}
            </button>
        </form>
    )
}