'use client';
import {BaseCheckboxType} from "./types.ts";
import {useState} from "react";

export function BaseCheckbox({
                                 required,
                                 disabled,
                                 checked,
                                 additionalClasses,
                                 onCheck
                             }: BaseCheckboxType) {
    const [instance, setInstance] = useState(checked != undefined?checked:false)

    return (
        <input
            required={required}
            type="checkbox"
            checked={instance}
            disabled={disabled}
            onChange={(el)=>{
                setInstance(el.currentTarget.checked)
                onCheck && onCheck(el)
            }}
            className={`form-check-input ${additionalClasses}`}/>
    )
}