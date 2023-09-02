import Card from "../../components/UI/Card.tsx";
import {Journal} from "../../types/types.ts";
import {useDispatch} from "react-redux";
import MessageBlock from "../../components/messages/MessageBlock.tsx";
import {addMessage} from "../../components/messages/messageSlice.ts";
import {useNavigate} from "react-router";
import JournalSelect from "../../components/journal/JournalSelect.tsx";

export default function SelectJournalPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function GetJournal(result: Journal[]) {
        if (result.length == 0) {
            dispatch(addMessage({
                type: "danger",
                text: "Нет журнала для этого класса и предмета"
            }))
        } else {
            navigate(`/journal/${result[0].id}`)
        }
    }

    return (
        <div className={"container"}>

            <div className={"row justify-content-center align-items-center full-height"}>
                <div className="col-lg-4">
                    <Card>
                        <MessageBlock/>
                        <JournalSelect GetJournal={GetJournal}/>
                    </Card>
                </div>
            </div>
        </div>
    )
}