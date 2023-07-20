import {SmartSelectType} from "./types.ts";
import BaseSelect from "./BaseSelect.tsx";
import {useEffect, useState} from "react";

export default function SmartSelect({
                                        options,
                                        additionalClasses,
                                        disabled,
                                        size,
                                        required,
                                        onSelect,
                                        multiple,
                                        initialSearch
                                    }: SmartSelectType) {
    const [smartOptions, changeSmartOptions] = useState(options)

    function filterOptions(text: string) {
        changeSmartOptions(options.map((el) => {
            if (!el.text.includes(text)){
                el.style = {...el.style, display: "none"}
            }else{
                el.style = {...el.style, display: "block"}
            }
            return el
        }))
    }

    useEffect(() => {
        if (initialSearch) {
            filterOptions(initialSearch)
        }
    }, [])


    return (
        <div>
            <div className="input-group mb-3 input-group-sm">
                <span className="input-group-text"><i className="bi bi-search"></i></span>
                <input className="form-control" type="text" placeholder="Поиск..." value={initialSearch}
                       onInput={(el) => {
                           filterOptions(el.currentTarget.value)
                       }}/>
            </div>
            <BaseSelect options={smartOptions}
                        additionalClasses={additionalClasses}
                        disabled={disabled}
                        size={size}
                        required={required}
                        onSelect={onSelect}
                        multiple={multiple}
            />
        </div>
    )
}