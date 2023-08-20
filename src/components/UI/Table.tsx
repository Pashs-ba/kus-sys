import {TableFieldType} from "./types.ts";
import {useState} from "react";

export default function Table({elements, table_fields, onDelete, additional_classes}: {
    elements: any[],
    table_fields: TableFieldType[],
    onDelete: (ids: number[]) => void
    additional_classes?: string
}) {
    const header = table_fields.map((field: TableFieldType) => <th key={field.name}
                                                                   style={field.width ? {width: `${field.width}%`} : {}}>{field.label}</th>)
    const [to_delete, setToDelete] = useState([] as number[])

    function GetFieldValue(element: any, field: TableFieldType) {
        if (field.valueProcessing) {
            return field.valueProcessing(element[field.name])
        }
        if (element[field.name]) {
            return element[field.name]
        }
        return ""
    }


    const body = elements.map((element: any) => {
        return (
            <tr key={element.id}>
                {
                    table_fields.map((field: TableFieldType) => {
                        return <td key={field.name}>{GetFieldValue(element, field)}</td>
                    })
                }
                <td><input type="checkbox" className="form-check-input" onInput={(el) => {
                    if (el.currentTarget.checked) {
                        setToDelete([...to_delete, element.id])
                    } else {
                        setToDelete(to_delete.filter((id) => id !== element.id))
                    }
                }}/></td>
            </tr>
        )

    })
    return (
        <table className={`table table-striped text-center ${additional_classes}`}>
            <thead>
            <tr>
                {header}
                <th>
                    <button className={"btn btn-danger btn-sm"} onClick={() => {
                        onDelete(to_delete)
                    }}>Удалить
                    </button>
                </th>
            </tr>
            </thead>
            <tbody>
            {body}
            </tbody>
        </table>
    )
}