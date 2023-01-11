import { createStore, createEvent } from 'effector'

export const getTime = createEvent()

export const timeStore = createStore(null).on(
    getTime, (params, result) => {
        let date = new Date();
        return [
            (date.getHours()<10?'0':'') + date.getHours() + ':' + (date.getMinutes()<10?'0':'') + date.getMinutes(),
            date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        ]
    }
)


