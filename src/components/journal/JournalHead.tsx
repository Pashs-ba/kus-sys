import {Lesson} from "../../types/types.ts";

export default function JournalHead({lessons}: { lessons: Lesson[] }) {
    return (
        <thead>
        <tr>
            <th colSpan={2}></th>
            <th colSpan={lessons.length} className={"text-center"}>Даты</th>
        </tr>
        <tr>
            <th>№</th>
            <th>Фамилия, имя</th>

            {
                lessons.map(el => {
                    return <th key={el.id}>
                        <div className={"m-auto text-center"}
                             >{`${new Date(el.date_val).getDate()<10?'0':''}${new Date(el.date_val).getDate()}`}</div>
                    {/*    style={{"writingMode": "vertical-rl", "textOrientation": "mixed"}}*/}
                    </th>
                })
            }
        </tr>
        </thead>
    )
}