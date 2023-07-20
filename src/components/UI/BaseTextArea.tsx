import {BaseTextAreaType} from "./types.ts";

export function BaseTextArea({required, disabled, additionalClasses, value, cols, rows, onInput}: BaseTextAreaType) {
    return (<textarea required={required} disabled={disabled} className={`form-control ${additionalClasses}`}
                      onInput={onInput} value={value} rows={rows} cols={cols}/>)
}