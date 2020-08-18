import {SET_TOPICS_DATA} from '../constants'

const initState = []

const topicsReducer = (state= initState,{type,payload}) => {
    switch (type) {
        case SET_TOPICS_DATA:
            return [...state, ...payload]
        default:
            return state
    }
}

export default topicsReducer