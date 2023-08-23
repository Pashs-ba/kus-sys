import {TableFieldType} from "./types.ts";
import {useEffect, useState} from "react";

export default function Table({
                                  elements,
                                  table_fields,
                                  onDelete,
                                  additional_classes,
                                  onEdit,
                                  NeedDelete,
                                  NeedEdit,
                                  Sort
                              }: {
    elements: any[],
    table_fields: TableFieldType[],
    onDelete: (ids: number[]) => void
    additional_classes?: string,
    onEdit: (element: any) => void
    NeedDelete?: boolean
    NeedEdit?: boolean,
    Sort?: (field_name: string, is_up: boolean) => void
}) {
    const [dynamic_table_fields, setTableFields] = useState(table_fields)
    useEffect(() => {
        table_fields.forEach((field) => {
            field.sortDown = false
        })
        setTableFields(table_fields)
    }, [])
    const header = dynamic_table_fields.map((field: TableFieldType) => {
        return (
            <th key={field.name}
                style={field.width ? {width: `${field.width}%`} : {}}>
                <a className={"text-decoration-none text-dark"}
                   href={"#"}
                   onClick={(el) => {
                       el.preventDefault()
                       field.sortDown = !field.sortDown
                       Sort && Sort(field.name, field.sortDown)
                   }}
                >
                    {field.label}
                </a>
            </th>
        )
    })
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
                {NeedEdit ?
                    <td>
                        <button className={"btn btn-primary btn-sm"} onClick={() => {
                            onEdit(element)
                        }}><i className={"bi bi-pencil"}></i></button>
                    </td> : null
                }
                {NeedDelete ?
                    <td><input type="checkbox" className="form-check-input" onInput={(el) => {
                        if (el.currentTarget.checked) {
                            setToDelete([...to_delete, element.id])
                        } else {
                            setToDelete(to_delete.filter((id) => id !== element.id))
                        }
                    }}/></td> : null
                }

            </tr>
        )

    })
    return (
        <table className={`table table-striped text-center ${additional_classes}`}>
            <thead>
            <tr>
                {header}
                {NeedEdit ? (
                    <th>
                        Изменить
                    </th>) : null
                }
                {NeedDelete ? (
                    <th>
                        <button className={"btn btn-danger btn-sm"} onClick={() => {
                            onDelete(to_delete)
                        }}>Удалить
                        </button>
                    </th>) : null
                }
            </tr>
            </thead>
            <tbody>
            {body}
            </tbody>
        </table>
    )
}