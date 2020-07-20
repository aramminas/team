import {ADD_UPDATE_USER_DATA} from '../constants'

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
}

const homeReducer = (state= initState,{type,payload}) => {
    switch (type) {
        case ADD_UPDATE_USER_DATA:
            return {
                ...state, ...payload
            }
        default:
            return state
    }
}

export default homeReducer