import {SET_TEAMS_DATA} from '../constants'

export const set_teams_data = (data) => {
    return {
        type: SET_TEAMS_DATA, payload : data
    }
}