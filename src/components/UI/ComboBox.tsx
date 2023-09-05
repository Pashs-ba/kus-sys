import {Autocomplete, TextField} from "@mui/material";
import {ComboboxFieldType, ComboboxOptionsType} from "./types.ts";
import {useEffect, useState} from "react";

export default function ComboBox({label, onInput, value, real_options}: {
    label: string,
    real_options: string[],
    onInput?: (el: any) => void,
    value: string
}) {
    const [current_value, setCurrentValue] = useState(value?value:"")
    useEffect(() => {
        console.log("boo")
        setCurrentValue(value)
    }, [value]);
    return (
        <Autocomplete
            disablePortal
            controlled={"true"}
            onChange={(el, newValue) => {
                setCurrentValue(newValue as string)
                if (onInput) {
                    onInput(newValue)
                }
            }}
            sx={{width: 300}}
            value={current_value}
            renderInput={
                (params) => {
                    return (
                        <TextField {...params}
                                   label={label}
                        />
                    )
                }
            }
            options={
                [
                    ...real_options, ""
                ]
            }
        />
    )
}