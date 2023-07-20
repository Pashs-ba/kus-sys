import {configureStore} from "@reduxjs/toolkit";
import messageReducer from "../components/messages/messageSlice.ts";
export default configureStore({
    reducer: {
        messenger: messageReducer
    }
})