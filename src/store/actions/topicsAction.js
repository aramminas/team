import {SET_TOPICS_DATA} from '../constants'

export const set_topics_data = (data) => {
    return {
        type: SET_TOPICS_DATA, payload : data
    }
}