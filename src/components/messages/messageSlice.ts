import {createSlice} from "@reduxjs/toolkit";
import {Message} from "./types.ts";

const slice = createSlice(
    {
        name: 'messenger',
        initialState: {
            messages: [] as Message[]
        },
        reducers: {
            addMessage: (state: any, action) => {
                state.messages.push({...action.payload, need_to_delete: true})
            },
            addMessageWithRedirection: (state: any, action) => {
                state.messages.push({...action.payload})
            },
            deleteMessage: (state: any, action) => {
                const index = state.messages.findIndex((message: Message) => message.text === action.payload.text)
                if (index !== -1) {
                    state.messages.splice(index, 1)
                }
            },
            setNeedToDeleteMessage: (state: any, action) => {
                const index = state.messages.findIndex((message: Message) => message.text === action.payload.text)
                state.messages[index].need_to_delete = true
            },

        }
    }
)
export const {
    addMessage,
    deleteMessage,
    setNeedToDeleteMessage,
    addMessageWithRedirection
} = slice.actions
export const selectMessages = (state: any) => state.messenger.messages
export default slice.reducer
