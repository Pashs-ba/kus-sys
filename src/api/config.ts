import axios from "axios";
import {useDispatch} from "react-redux";
import {addMessage} from "../components/messages/messageSlice.ts";

export function ConfigInterceptors(){
    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        const dispatch = useDispatch()
        dispatch(addMessage({
            type: "danger",
            text: error.response.data
        }))
        return Promise.reject(error);
    });
}