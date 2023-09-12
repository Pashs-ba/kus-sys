import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Contest, Question} from "../../types/types.ts";
import {GetContestWithQuestions, GetFullQuestion, SendAnswer} from "../../api/utils.ts";
import {ContestQuestionsList} from "../../components/contests/ContestQuestionsList.tsx";
import {Form} from "../../components/UI/Form.tsx";
import {ElementType} from "../../components/UI/types.ts";
import QuestionPage from "../../components/contests/QuestionPage.tsx";

export default function ContestPage() {
    const params = useParams()
    const [contest, setContest] = useState<Contest>({} as Contest)
    const [currentQuestion, setCurrentQuestion] = useState(-1)
    useEffect(() => {
        GetContestWithQuestions(params.contest_id as Number).then((res) => {
            setContest(res)
        })
    }, []);

    function GetQuestion(): Question {
        return contest.questions?.find((el) => el.id == currentQuestion)
    }

    function UpdateQuestion(force: boolean = false) {
        if (!currentQuestion || currentQuestion == -1) return
        if (contest.questions?.find((el) => el.id == currentQuestion).legend && !force) return
        GetFullQuestion(currentQuestion).then((res) => {
            const index = contest.questions?.findIndex((el) => el.id == currentQuestion)
            setContest({
                ...contest,
                questions: [
                    ...contest.questions?.slice(0, index),
                    res,
                    ...contest.questions?.slice(index + 1)
                ]
            })
        })
    }

    useEffect(() => {
        UpdateQuestion()
    }, [currentQuestion]);

    return (
        <div className={"row h-100"} style={{maxWidth: "100%"}}>
            <div className="col-2 border-end h-100 text-center">
                <ContestQuestionsList
                    contest={contest}
                    currentQuestion={currentQuestion}
                    setCurrentQuestion={setCurrentQuestion}
                />
            </div>
            <div className={"col-10 h-100 overflow-auto"}>
                <QuestionPage currentQuestion={currentQuestion}
                              GetQuestion={GetQuestion}
                              UpdateQuestion={UpdateQuestion}/>
            </div>
        </div>
    )
}