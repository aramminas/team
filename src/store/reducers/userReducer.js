import {ADD_UPDATE_USER_DATA, USER_EDIT} from '../constants'

const initState = {
    avatarUrl: "",
    birthDate: "",
    companyId: "",
    email: "",
    firstName: "",
    jsExperience: "",
    lastName: "",
    reactExperience: "",
    sex: "",
    token: "",
    edit: false,
}

const homeReducer = (state= initState,{type,payload}) => {
    switch (type) {
        case ADD_UPDATE_USER_DATA:
            return {
                ...state, ...payload
            }
        case USER_EDIT:
            return {
                ...state, edit: payload
            }
        default:
            return state
    }
}

export default homeReducer