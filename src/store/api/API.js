import axios from 'axios'
import data from '../../constants'
const API_URL = data.api_url
/* Get All Users Data */
const getAllUsersData = () => {
    return new Promise(function(resolve, reject) {
        //reject({message: `Database error. 'Test Add Score' data! ${error.message}`})
    })
}

/* Get All Companies Data */
const getCompanies = () => {
    return new Promise(function(resolve, reject) {
        axios.get(`${API_URL}/api/v1/companies`)
            .then(res => {
                if(res.status === 200 && res.data.length > 0){
                    resolve(res.data)
                }else {
                    reject({message: `Empty Companies Data!`})
                }
            }).catch(error => {
                if(error.response && error.response.data && error.response.data !== ""){
                    reject({message: `Api error. ${error.response.data}!`})
                }else {
                    reject({message: `Api error. 'Failed to get a list of companies' !`})
                }
            })
    })
}

/* Register New User */
const registerNewUser = (data) => {
    return new Promise(function(resolve, reject) {
        axios.post(`${API_URL}/api/v1/users/register`, {
            ...data
        }).then(res => {
            if(res.status === 200){
                resolve({success: true})
            }else {
                console.log('error',res)
                reject({message: `Api error. 'failed to register user' !`})
            }
        }).catch(error => {
            if(error.response && error.response.data && error.response.data !== ""){
                reject({message: `Api error. ${error.response.data}!`})
            }else {
                reject({message: `Api error. 'failed to register user' !`})
            }
        })
    })
}

/* Sign In User */
const signInUser = (data) => {
    return new Promise(function(resolve, reject) {
        axios.post(`${API_URL}/api/v1/users/login`, {
            ...data
        }).then(res => {
            if(res.status === 200 && res.data){
                resolve({...res.data})
            }else {
                console.log('error',res)
                reject({message: `Api error. 'failed to login' !`})
            }
        }).catch(error => {
            if(error.response && error.response.data && error.response.data !== ""){
                reject({message: `Api error. ${error.response.data}!`})
            }else {
                reject({message: `Api error. 'failed to login' !`})
            }
        })
    })
}

/* Get User Data by Token */
const getUserData = (token) => {
    return new Promise(function(resolve, reject) {
        axios.get(`${API_URL}/api/v1/users`, {
            headers: {
                'token': token,
            }
        }).then(res => {
            if(res.status === 200 && res.data){
                resolve({...res.data})
            }else {
                console.log('error',res)
                reject({message: `Api error. 'failed to get user data' !`})
            }
        }).catch(error => {
            if(error.response && error.response.data && error.response.data !== ""){
                reject({message: `Api error. ${error.response.data}!`})
            }else {
                reject({message: `Api error. 'failed to get user data' !`})
            }
        })
    })
}

/* User Logout */
const logout = (token) => {
    return new Promise(function(resolve, reject) {
        axios.get(`${API_URL}/api/v1/users/logout`, {
            headers: {
                'token': token,
            }
        }).then(res => {
            if(res.status === 200 && res.data){
                resolve({...res.data})
            }else {
                console.log('error',res)
                reject({message: `Api error. 'failed to user logout' !`})
            }
        }).catch(error => {
            if(error.response && error.response.data && error.response.data !== ""){
                reject({message: `Api error. ${error.response.data}!`})
            }else {
                reject({message: `Api error. 'failed to user logout' !`})
            }
        })
    })
}

/* Update User Data */
const updateUserData = (data, token) => {
    return new Promise(function(resolve, reject) {
        axios.put(`${API_URL}/api/v1/users/update`,
            {...data},
            {headers: {'token': token}}
            ).then(res => {
            if(res.status === 200 && res.data){
                resolve({...res.data})
            }else {
                console.log('error',res)
                reject({message: `Api error. 'failed to user logout' !`})
            }
        }).catch(error => {
            if(error.response && error.response.data && error.response.data !== ""){
                reject({message: `Api error. ${error.response.data}!`})
            }else {
                reject({message: `Api error. 'failed to user logout' !`})
            }
        })
    })
}

/* Projects Data */
const getProjects = (token) => {
    return new Promise(function(resolve, reject) {
        axios.get(`${API_URL}/api/v1/projects`, {
            headers: {
                'token': token,
            }
        }).then(res => {
            if(res.status === 200 && res.data){
                resolve([...res.data])
            }else {
                console.log('error',res)
                reject({message: `Api error. 'failed to get projects data' !`})
            }
        }).catch(error => {
            if(error.response && error.response.data && error.response.data !== ""){
                reject({message: `Api error. ${error.response.data}!`})
            }else {
                reject({message: `Api error. 'failed to get projects data' !`})
            }
        })
    })
}

/* Vote for Project */
const voteForProject = (token, id, type) => {
    return new Promise(function(resolve, reject) {
        axios.post(`${API_URL}/api/v1/projects/${id}/voting`,
            {type: type}, {headers: {'token': token}
        }).then(res => {
            if (res.status === 200) {
                resolve({result: true})
            } else {
                console.log('error', res)
                reject({message: `Api error. 'failed to vote for the project' !`})
            }
        }).catch(error => {
            if (error.response && error.response.data && error.response.data !== "") {
                reject({message: `Api error. ${error.response.data}!`})
            } else {
                reject({message: `Api error. 'failed to vote for the project' !`})
            }
        })
    })
}

/* Get Topics Data */
const getTopics = (token) => {
    return new Promise(function(resolve, reject) {
        axios.get(`${API_URL}/api/v1/topics`,{
            headers: {
                'token': token,
            }
        }).then(res => {
            if (res.status === 200 && res.data) {
                resolve([...res.data])
            } else {
                console.log('error', res)
                reject({message: `Api error. 'failed to get topics data' !`})
            }
        }).catch(error => {
            if (error.response && error.response.data && error.response.data !== "") {
                reject({message: `Api error. ${error.response.data}!`})
            } else {
                reject({message: `Api error. 'failed to get topics data' !`})
            }
        })
    })
}

/* Vote for Topic */
const voteForTopic = (token, id, type) => {
    return new Promise(function(resolve, reject) {
        axios.post(`${API_URL}/api/v1/topics/${id}/voting`,
            {type: type}, {headers: {'token': token}
            }).then(res => {
            if (res.status === 200) {
                resolve({result: true})
            } else {
                console.log('error', res)
                reject({message: `Api error. 'failed to vote for the topic' !`})
            }
        }).catch(error => {
            if (error.response && error.response.data && error.response.data !== "") {
                reject({message: `Api error. ${error.response.data}!`})
            } else {
                reject({message: `Api error. 'failed to vote for the topic' !`})
            }
        })
    })
}

/* Delete Topic */
const deleteTopicById = (token, id) => {
    return new Promise(function(resolve, reject) {
        axios.delete(`${API_URL}/api/v1/topics/${id}`,
            {headers: {'token': token}
        }).then(res => {
            if (res.status === 200) {
                resolve({result: true})
            } else {
                console.log('error', res)
                reject({message: `Api error. 'failed to delete topic' !`})
            }
        }).catch(error => {
            if (error.response && error.response.data && error.response.data !== "") {
                reject({message: `Api error. ${error.response.data}!`})
            } else {
                reject({message: `Api error. 'failed to delete topic' !`})
            }
        })
    })
}

/* Add new Topic */
const addTopic = (token, topic) => {
    return new Promise(function(resolve, reject) {
        axios.post(`${API_URL}/api/v1/topics`,
            {title: topic}, {
                headers: {'token': token}
            }).then(res => {
            if (res.status === 200) {
                resolve({result: true})
            } else {
                console.log('error', res)
                reject({message: `Api error. 'failed to add new topic' !`})
            }
        }).catch(error => {
            if (error.response && error.response.data && error.response.data !== "") {
                reject({message: `Api error. ${error.response.data}!`})
            } else {
                reject({message: `Api error. 'failed to add new topic' !`})
            }
        })
    })
}

/* Get Teams Data */
const getTeams = (token) => {
    return new Promise(function(resolve, reject) {
        axios.get(`${API_URL}/api/v1/teams`,{
            headers: {
                'token': token,
            }
        }).then(res => {
            if (res.status === 200 && res.data) {
                resolve([...res.data])
            } else {
                console.log('error', res)
                reject({message: `Api error. 'failed to get teams data' !`})
            }
        }).catch(error => {
            if (error.response && error.response.data && error.response.data !== "") {
                reject({message: `Api error. ${error.response.data}!`})
            } else {
                reject({message: `Api error. 'failed to get teams data' !`})
            }
        })
    })
}

const API = {
    getAllUsersData, // get all users data from api
    getCompanies, // get all companies data from api
    registerNewUser, // register new user from api
    updateUserData, // update user data from api
    signInUser, // sign in user from api
    getUserData, // get user data by user token from api
    logout, // user logout from api
    getProjects, // get projects from api
    voteForProject, // vote for project by id from api
    getTopics, // get topics from api
    voteForTopic, // vote for topic by id from api
    deleteTopicById, // delete topic by id from api
    addTopic, // add new topic from api
    getTeams, // get teams from api
}

export default API