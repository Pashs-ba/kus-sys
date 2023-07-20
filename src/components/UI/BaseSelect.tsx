import {BaseSelectType} from "./types.ts";

export default function BaseSelect({
                                       options,
                                       additionalClasses,
                                       disabled,
                                       required,
                                       multiple,
                                       size,
                                       onSelect
                                   }: BaseSelectType) {
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
                        selected={option.selected}
                        disabled={option.disabled}
                        style={option.style}>{option.text}</option>
            ))}
        </select>
    )
}