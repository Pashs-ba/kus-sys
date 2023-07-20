import {BaseRadioType} from "./types.ts";

export default function BaseRadio({
                                      checked,
                                      connect_with,
                                      required,
                                      disabled,
                                      additionalClasses,
                                      onCheck
                                  }: BaseRadioType) {
    return (
        <input type={"radio"}
               className={`form-check-input ${additionalClasses}`}
               required={required}
               disabled={disabled}
               name={connect_with}
               checked={checked}
               onChange={onCheck}
        />)
}