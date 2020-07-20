import React from 'react'
import {connect, useSelector} from 'react-redux'
import {change_home_state, get_all_users_data} from  '../../store/actions/homeAction'
import Layout from '../../hoc/layout/Layout'

import './Home.scss'

const Home = (props) => {
    const {home} = useSelector(state => state)
    return (
        <div className={'main-container home-content'}>
           Home
            <button onClick={()=>props.changeHomeState(!home.userLogged)}>
                change
            </button>

            <hr/>
            <button onClick={()=>props.getUserData()}>
                test redux thunk
            </button>
            {home.errors && home.errors.message ? home.errors.message : "no"}
            <hr/>
            <div>
                { home.users.length > 0 ?
                    home.users.map(user => (
                        <div key={user.id}>
                            <p>first name: {user.first_name}</p>
                            <p>last name: {user.last_name}</p>
                        </div>
                    )) :
                    <span>no data</span>

                }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeHomeState: (data) => {dispatch(change_home_state(data))},
        getUserData: () => {dispatch(get_all_users_data())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Layout(Home))