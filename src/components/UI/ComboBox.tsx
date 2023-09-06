import {Autocomplete, TextField} from "@mui/material";
import {useEffect, useState} from "react";

export default function ComboBox({label, onInput, value, real_options}: {
    label: string,
    real_options: string[],
    onInput?: (el: any) => void,
    value?: string
}) {
    const [current_value, setCurrentValue] = useState(value?value:null)
    useEffect(() => {
        setCurrentValue(value?value:null)
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
            sx={{width: 1}}
            value={current_value}
            renderInput={
                (params) => {
                    return (
                        <TextField {...params}
                            size={"small"}
                                   label={label}
                        />
                    )
                }
            }
            options={
                real_options
            }
        />
    )
}