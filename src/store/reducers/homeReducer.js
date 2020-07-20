import {CHANGE_HOME_STATE, ALL_USER_DATA, SET_HOME_ERRORS} from '../constants'

const initState = {
    userLogged: false,
    users: [],
    errors: {},
}

const homeReducer = (state= initState,{type,payload}) => {
    switch (type) {
        case CHANGE_HOME_STATE:
            return {
                ...state,
                userLogged: payload
            }
        case ALL_USER_DATA:
            return {
                ...state,
                users: payload
            }
        case SET_HOME_ERRORS:
            return {
                ...state,
                errors: payload
            }
        default:
            return state
    }
}

export default homeReducer