import {Lesson} from "../../types/types.ts";

export default function ThemeList({lessons}: {lessons: Lesson[]}) {
    function GetMonthDay(raw_date: string) {
        const date = new Date(raw_date)
        const month = date.getMonth()+1
        const day = date.getDate()
        return `${day > 9 ? day : "0" + day}.${month > 9 ? month : "0" + month}`
    }
    return (
        <table className={"table table-bordered table-striped"}>
            <tbody>
            {
                lessons.map((el, index) => {
                    return (
                        <tr key={index}>
                            <td style={{"verticalAlign": "middle"}}>{GetMonthDay(el.date_val)}</td>
                            <td>{el.theme.name}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )

}