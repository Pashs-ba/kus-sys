import {BaseSelectType, SelectNodes} from "./types.ts";

export default function BaseSelect({
                                       options,
                                       additionalClasses,
                                       disabled,
                                       required,
                                       multiple,
                                       size,
                                       onSelect,
                                        value
                                   }: BaseSelectType) {
    function IsSelected(option: SelectNodes) {
        if (value) {
            if (multiple) {
                return value.includes(option.value)
            }
            return value === option.value
        }
        return false
    }
    return (

        <select
            className={`form-select ${additionalClasses}`}
            disabled={disabled}
            required={required}
            multiple={multiple}
            size={size}
            onChange={(el) => onSelect ? onSelect(el) : ""}
        >
            {options.map((option) => (
                <option key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                        selected={IsSelected(option)}
                        style={option.style}>{option.text}</option>
            ))}
        </select>
    )
}