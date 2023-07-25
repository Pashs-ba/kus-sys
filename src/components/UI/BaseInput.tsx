'use client';
import {BaseInputType} from './types.ts'
export default function BaseInput(
    {
        placeholder,
        additionalClasses,
        value,
        disabled,
        type,
        min,
        max,
        required,
        onInput
    }:
        BaseInputType
) {
    return (
        <input
            className={"form-control " + additionalClasses}
            placeholder={placeholder}
            defaultValue={value}
            disabled={disabled}
            type={type}
            required={required}
            min={min}
            max={max}
            onChange={el=>{
                if (onInput) {
                    onInput(el)
                }}}
        ></input>
    )
}