import {TableInputType} from "./types.ts";
import BaseInput from "./BaseInput.tsx";
import {useState} from "react";

export default function TableInput(props: TableInputType) {
    function getValueByIndex(index: number, values?: any[]) {
        if (!values) return null
        return values.length > index ? values[index] : null
    }

    const [values, setValues] = useState(props.values ? props.values : Array(props.headers.length))

    return (
        <>
            {
                props.vertical ? (
                    <table className={"table table-bordered "}>
                        <tbody>
                        {
                            props.headers.map((el, index) => {
                                return (
                                    <tr key={index} className={"text-center"}>
                                        <td className={"align-middle"}>
                                                {el}
                                        </td>
                                        <td>
                                            <BaseInput value={getValueByIndex(index, props.values)} onInput={(el) => {
                                                const newValues = [...values]
                                                newValues[index] = el
                                                props.onInput && props.onInput(newValues)
                                                setValues(newValues)
                                            }}/>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                ) : (
                    <table className={"table table-bordered "}>
                        <thead>
                        <tr>
                            {props.headers.map((el, index) => {
                                return (<td key={index} className={"text-center"}>{el}</td>)
                            })}
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            {
                                props.headers.map((_, index) => {
                                    return (
                                        <td key={index} className={"text-center"}>
                                            <BaseInput value={getValueByIndex(index, props.values)} onInput={(el) => {
                                                const newValues = [...values]
                                                newValues[index] = el
                                                props.onInput && props.onInput(newValues)
                                                setValues(newValues)
                                            }}/>
                                        </td>
                                    )
                                })
                            }
                        </tr>
                        </tbody>
                    </table>
                )
            }
        </>
    )
}