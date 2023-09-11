'use client';
import {BaseInputType} from './types.ts'
import {useEffect, useState} from "react";
import {TextField} from "@mui/material";

export default function BaseInput(
    props: BaseInputType
) {
    const [value, setValue] = useState(props.value != undefined?props.value:"")
    useEffect(()=>{
        setValue(props.value != undefined?props.value:"")
    }, [props.value])
    const GetInputProps = () => {
        let input_props = {} as any
        if (props.min != undefined){
            input_props["min"] = props.min
        }
        if (props.max){
            input_props["max"] = props.max
        }
        if (props.additionalClasses){
            input_props["className"] = props.additionalClasses
        }
        return input_props
    }

    function SetSX(){
        let res = {width: 1}
        if (props.simple){
            res["& fieldset"] = { border: 'none' }
            res["border"] = "none"
        }
        return res
    }

    return (
        <TextField
            className={props.additionalClasses}
            size={props.size?props.size as any:"small"}
            label={props.label}
            type={props.type?props.type:"text"}
            value={value}
            sx={{...SetSX()}}
            inputProps={GetInputProps()}
            onChange={(el)=>{
                props.onInput && props.onInput(el.target.value)
                setValue(el.target.value)
            }}
        ></TextField>
    )
}