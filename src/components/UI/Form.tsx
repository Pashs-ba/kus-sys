'use client';

import {
    BaseCheckboxType,
    BaseFileType,
    BaseInputType,
    BaseRadioType,
    BaseSelectType,
    BaseTextAreaType,
    ComboboxFieldType,
    ElementType,
    FormType,
    ScheduleFieldType,
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
import ScheduleInput from "./ScheduleInput.tsx";
import ComboBox from "./ComboBox.tsx";

export function Form({
                         elements,
                         additionalClassesButton,
                         buttonText,
                         horizontal,
                         onSubmit,
                         additionalClasses,
                         instance
                     }: FormType) {
    const [form_values, change_form_values] = useState({})
    useEffect(() => {
        if (instance) {
            const instance_values = {} as any
            elements.map((el) => {
                instance_values[el.name] = instance[el.name] as any
            })
            change_form_values(instance_values)
        }
    }, [])

    useEffect(() => {
        const new_values = {}
        elements.map((el) => {
            if (el.type === ElementType.SELECT || el.type === ElementType.SMART_SELECT) {
                if ((el.settings as BaseSelectType).multiple) {
                    new_values[el.name] = []
                } else {
                    if ((el.settings as BaseSelectType).options.length > 0) {
                        new_values[el.name] = (el.settings as BaseSelectType).options[0].value
                    } else {
                        new_values[el.name] = ""
                    }
                }
            }
            if (instance && instance[el.name]) {
                new_values[el.name] = instance[el.name]
            }
        })
        change_form_values(new_values)
    }, [elements, instance])

    function element_value_change(el: any, name: string) {
        change_form_values({...form_values, [name]: el})
    }

    function create_input(settings: BaseInputType, name: string) {
        return (
            <BaseInput placeholder={settings.placeholder}
                       value={instance ? instance[name] : ""}
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
                value={instance ? instance[name] : ""}
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
                url={instance ? instance["url"] : ""}
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
                         value={instance ? instance[name] : ""}
            />
        )
    }

    function create_schedule_input(settings: ScheduleFieldType, name: string) {
        return (
            <ScheduleInput value={instance ? instance[name] : ""}
                           additionalClasses={settings.additionalClasses}
                           onInput={(el) => {
                               element_value_change(el, name)
                           }}
            />
        )
    }

    function create_combobox(settings: ComboboxFieldType, name: string, label: string) {
        function GetValue(){
            if (instance){
                const res = settings.options.find((option)=>{return option.id == instance[name]})?.label
                if (res){
                    return res
                }
            }
            return ""
        }
        return (
            <ComboBox label={label}
                      real_options={settings.options.map((option) => option.label)}
                      value={GetValue()}
                      onInput={(el) => {
                          const option = settings.options.find((option)=>{return option.label === el})
                          if (option) {
                              element_value_change(option.id, name)
                          }
                      }}/>
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
            case ElementType.SCHEDULE:
                rendered_element = create_schedule_input(element.settings as ScheduleFieldType, element.name)
                break
            case ElementType.COMBOBOX:
                rendered_element = create_combobox(element.settings as ComboboxFieldType, element.name, element.label)
                break
        }
        switch (element.type) {
            case ElementType.CHECKBOX:
            case ElementType.RADIO:
                return (
                    <div className={`${horizontal ? "me-3" : "mb-3"} form-check`} key={element.name}>
                        {rendered_element}
                        <label className={"form-check-label"}>{element.label}</label>
                    </div>
                )
            case ElementType.COMBOBOX:
                return (
                    <div className={`${horizontal ? "me-3" : "mb-3"}`} key={element.name}>
                        {rendered_element}
                    </div>
                )
            default:
                return (
                    <div className={`${horizontal ? "me-3" : "mb-3"}`} key={element.name}>
                        <label className={"form-label"}>{element.label}</label>
                        {rendered_element}
                    </div>
                )
        }

    })

    return (
        <form className={`${horizontal ? "d-flex" : ""} ${additionalClasses}`}>
            {form_elements}
            <button
                className={`btn btn-primary ${additionalClassesButton} ${horizontal ? "my-2" : ""}`}
                onClick={(el) => {
                    el.preventDefault()
                    onSubmit(form_values)
                }}
                data-bs-dismiss="modal"
                //TODO Fix close when unvalidated
            >
                {buttonText ? buttonText : "Submit"}
            </button>
        </form>
    )
}