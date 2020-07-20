import {applyMiddleware, combineReducers, compose, createStore} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"

/* Reducers */
import languageReducer from "./reducers/languageReducer"
import homeReducer from "./reducers/homeReducer"
import userReducer from "./reducers/userReducer"

const AllReducers = combineReducers({
    language: languageReducer,
    home: homeReducer,
    user: userReducer,
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