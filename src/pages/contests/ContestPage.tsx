import {useParams, useRoutes} from "react-router-dom";
import {useEffect, useState} from "react";
import {Contest} from "../../types/types.ts";
import {GetContestWithQuestions} from "../../api/utils.ts";
import {ContestQuestionsList} from "../../components/contests/ContestQuestionsList.tsx";

export default function ContestPage() {
    const params = useParams()
    const [contest, setContest] = useState<Contest>({} as Contest)
    const [currentQuestion, setCurrentQuestion] = useState(-1)
    useEffect(() => {
        GetContestWithQuestions(params.contest_id as Number).then((res) => {
            setContest(res)
        })
    }, []);
    useEffect(() => {

    }, []);
    return (
        <div className={"row h-100"} style={{maxWidth: "100%"}}>
            <div className="col-2 border-end h-100 text-center">
                <ContestQuestionsList
                    contest={contest}
                    setCurrentQuestion={setCurrentQuestion}
                />
            </div>
            <div className={"col-10 h-100 overflow-auto"}>
                {
                    currentQuestion == -1?(
                        <div className={"h-100 d-flex justify-content-center align-items-center"}>
                            <i className={"bi bi-arrow-left fs-1 me-2"}/>
                            <h3 className={"m-0"}>Выберете задание из списка слева</h3>
                        </div>
                    ):(
                        <div>{currentQuestion}</div>
                    )
                }
            </div>
        </div>
    )
}