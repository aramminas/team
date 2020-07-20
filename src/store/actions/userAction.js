import {ADD_UPDATE_USER_DATA} from '../constants'

export const set_user_data = (data) => {
    return {
        type: ADD_UPDATE_USER_DATA, payload : data
    }
}