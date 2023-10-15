import {BaseRadioType} from "./types.ts";
import {useState} from "react";

export default function BaseRadio({
                                      checked,
                                      connect_with,
                                      required,
                                      disabled,
                                      additionalClasses,
                                      onCheck
                                  }: BaseRadioType) {
    const [instance, setInstance] = useState(checked != undefined?checked:false)
    return (
        <input type={"radio"}
               className={`form-check-input ${additionalClasses}`}
               required={required}
               disabled={disabled}
               name={connect_with}
               checked={instance}
               onChange={(el)=>{
                   setInstance(el.currentTarget.checked)
                   onCheck && onCheck(el)
               }}
        />)
}