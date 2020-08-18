import {applyMiddleware, combineReducers, compose, createStore} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"

/* Reducers */
import languageReducer from "./reducers/languageReducer"
import homeReducer from "./reducers/homeReducer"
import userReducer from "./reducers/userReducer"
import projectsReducer from "./reducers/projectsReducer"
import teamsReducer from "./reducers/teamsReducer"
import topicsReducer from "./reducers/topicsReducer"

const AllReducers = combineReducers({
    language: languageReducer,
    home: homeReducer,
    user: userReducer,
    projects: projectsReducer,
    teams: teamsReducer,
    topics: topicsReducer,
})

const InitialState = {}
const middleware = [
    thunk,
]

const store = createStore(
    AllReducers,
    InitialState,
    compose(composeWithDevTools(applyMiddleware(...middleware)))
)

export default store