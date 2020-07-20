import {CHANGE_HOME_STATE, ALL_USER_DATA, SET_HOME_ERRORS} from '../constants'
import API from '../api/API'

export const change_home_state = (data) => {
    return {
        type: CHANGE_HOME_STATE, payload : data
    }
}

export const get_all_users_data = () => dispatch => {
    API.getAllUsersData().then(data => {
        const {users} = data
        if(users && users.length > 0){
            dispatch({type: ALL_USER_DATA, payload : [...users]})
        }
    }).catch(error => {
        if(Object.keys(error).length > 0){
            dispatch({type: SET_HOME_ERRORS, payload : {...error}})
        }
    })
}