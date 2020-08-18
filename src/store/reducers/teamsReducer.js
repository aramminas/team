import {SET_TEAMS_DATA} from '../constants'

const initState = []

const teamsReducer = (state= initState,{type,payload}) => {
    switch (type) {
        case SET_TEAMS_DATA:
            return [...state, ...payload]
        default:
            return state
    }
}

export default teamsReducer