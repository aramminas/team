import {SET_PROJECTS_DATA} from '../constants'

const initState = []

const projectsReducer = (state= initState,{type,payload}) => {
    switch (type) {
        case SET_PROJECTS_DATA:
            return [...state, ...payload]
        default:
            return state
    }
}

export default projectsReducer