import {useParams} from "react-router-dom";

export default function JournalPage(){
    const params = useParams()
    return (
        <div>
            <h1>{params.journal_id}</h1>
        </div>
    )

}