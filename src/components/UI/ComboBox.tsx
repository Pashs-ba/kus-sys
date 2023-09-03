import {Autocomplete, TextField} from "@mui/material";
import {ComboboxFieldType} from "./types.ts";

export default function ComboBox({label, options}: ComboboxFieldType) {
    return (
        <Autocomplete
            renderInput={
                () => <TextField label={label}/>
            }
            options={
                options
            }
        />
    )
}