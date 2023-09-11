import {Contest} from "../../types/types.ts";
import {useDispatch} from "react-redux";
import {addMessage} from "../messages/messageSlice.ts";
import {useNavigate} from "react-router";

export function ContestQuestionsList({contest, setCurrentQuestion}: {
    contest: Contest,
    setCurrentQuestion: (el: number) => void
}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (
        <div className="d-flex flex-column h-100">
            <div className={"py-3 fs-3 fw-bold border-bottom"}>
                {contest.name}
            </div>
            <div className={"py-3 flex-grow-1 overflow-auto border-bottom"}>
                <ul className="list-group">
                    {
                        contest.questions?.map((el, id) => {
                            return <li className={"list-group-item"} key={id}>
                                <a className={"text-decoration-none text-dark"}
                                   href={"#"}
                                   onClick={() => {
                                    setCurrentQuestion(el.id)
                                }}>{el.name}</a>
                            </li>
                        })
                    }
                </ul>
            </div>
            <div className={"my-4"}>
                <button className={"btn btn-primary"} onClick={()=>{
                    dispatch(addMessage({
                        type: "success",
                        text: "Вы успешно вышли из соревнования"
                    }))
                    navigate("/")
                }}>Закончить соревнование</button>
            </div>
        </div>
    )
}