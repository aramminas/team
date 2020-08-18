import {SET_PROJECTS_DATA} from '../constants'

export const set_projects_data = (data) => {
    return {
        type: SET_PROJECTS_DATA, payload : data
    }
}