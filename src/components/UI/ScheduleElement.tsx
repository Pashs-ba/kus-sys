import BaseInput from "./BaseInput.tsx";
import {useEffect, useState} from "react";

export function ScheduleElement({weekday, value, onInput}: {
    weekday: string,
    value?: any,
    onInput?: (el: any) => void
}) {
    const [value_fixed, set_value_fixed] = useState(value)
    useEffect(() => {
        set_value_fixed(value)
    }, [value])
    return (
        <div className="row align-items-center justify-content-center mb-3">
            <div className="col-8">
                {weekday}:
            </div>
            <div className="col-4">
                <BaseInput
                    type={"number"}
                    min={0}
                    max={23}
                    value={value_fixed}
                    onInput={(el) => {
                        if (onInput) {
                            onInput(el.currentTarget.value)
                        }
                    }}
                />
            </div>
        </div>
    )
}