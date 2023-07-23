import {Lesson} from "../../types/types.ts";

export default function JournalHead({lessons}: { lessons: Lesson[] }) {
    return (
        <thead>
        <tr>
            <th style={{"width": "15%"}}></th>
            {
                lessons.map(el => {
                    return <th key={el.id} className={"text-center"}>{el.date_val}</th>
                })
            }
        </tr>
        </thead>
    )
}