import {useDispatch, useSelector} from "react-redux";
import {deleteMessage, selectMessages, setNeedToDeleteMessage} from "./messageSlice.ts";
import {Message} from "./types.ts";
import {useEffect} from "react";

export default function MessageBlock() {
    const messages = useSelector(selectMessages) as Message[]
    const dispatch = useDispatch()

    useEffect(() => {
        messages.map(el => {
            if (!el.constant) {
                el.need_to_delete ? dispatch(deleteMessage(el)) : dispatch(setNeedToDeleteMessage(el))
            }
        })

    }, [])

    function renderMessages() {
        const result = []
        for (let i = 0; i < messages.length; i++) {
            result.push(
                <div
                    className={`d-flex justify-content-between alert alert-${messages[i].type ? messages[i].type : "primary"}`}
                    key={i}>
                    <div>
                        {messages[i].constant ? <i className="bi bi-pin-angle-fill me-3"></i> : null}
                        {messages[i].text}
                    </div>
                    <div>
                        {messages[i].constant ? <button type="button"
                                                        className="btn-close"
                                                        onClick={() => {
                                                            dispatch(deleteMessage(messages[i]))
                                                        }}/> : null}
                    </div>

                </div>
            )
        }

        return result
    }

    return (
        <>
            {renderMessages()}
        </>
    )
}