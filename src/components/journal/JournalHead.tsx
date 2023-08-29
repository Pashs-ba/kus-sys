import {Lesson} from "../../types/types.ts";

export default function JournalHead({lessons}: { lessons: Lesson[] }) {
    return (
        <thead>
        <tr>
            <th>№</th>
            <th>Фамилия, имя</th>
            <th colSpan={lessons.length} className={"text-center"}>Даты</th>
        </tr>
        <tr>
            <th colSpan={2}></th>
            {
                lessons.map(el => {
                    return <th key={el.id}>
                        <div className={"m-auto"}
                             style={{"writing-mode": "vertical-rl", "text-orientation": "mixed"}}>{el.date_val}</div>
                    </th>
                })
            }
        </tr>
        </thead>
    )
}