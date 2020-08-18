import {ADD_UPDATE_USER_DATA, USER_EDIT} from '../constants'

export const set_user_data = (data) => {
    return {
        type: ADD_UPDATE_USER_DATA, payload : data
    }
}


export const user_edit = (data) => {
    return {
        type: USER_EDIT, payload : data
    }
}