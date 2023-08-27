'use client';
import {BaseInputType} from './types.ts'
import {useEffect, useState} from "react";
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
        onInput,
        onKeyPress,
        size
    }:
        BaseInputType
) {
    return (
        <input
            className={"form-control " + additionalClasses}
            placeholder={placeholder}
            key={value}
            defaultValue={value}
            disabled={disabled}
            type={type}
            required={required}
            min={min}
            max={max}
            size={size}
            onChange={el=>{
                if (onInput) {
                    onInput(el)
                }}}
            onKeyDown={el=>{
                if (onKeyPress) {
                    onKeyPress(el)
                }
            }}
        ></input>
    )
}