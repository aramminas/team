import React, {useEffect, useState} from 'react'
import {connect, useSelector} from "react-redux"
import {set_user_data, user_edit} from '../../store/actions/userAction'
import { makeStyles } from '@material-ui/core/styles'
import {Grid} from '@material-ui/core'
import Layout from '../../hoc/layout/Layout'
import UserParameters from "./UserParameters"
import API from "../../store/api/API"
import './Users.scss'

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
}))

function UserProfile(props) {
    const classes = useStyles()
    const [companiesList, setCompaniesList] = useState({})
    const {user} = useSelector(state => state)
    const {lang} = props

    useEffect(function () {
        getAllCompanies()
    }, [])

    const getAllCompanies = () => {
        API.getCompanies().then(res => {
            if(res && res.length > 0){
                setCompaniesList([...res])
            }
        }).catch(error => {
            console.log('error',error)
        })
    }

    const updateUserChange = (data) => {
        props.setUserDataToStore(data)
    }

    const userEdit = () => {
        props.userEdit(!user.edit)
    }

    const style = user.edit ?  "" : "white"

    return (
        <div className={"main-container"}>
            <div className={`${classes.root} user-profile-content ${style}`}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <div className={"user-profile-title"}>
                            <div className="user-shadows">
                                {user.firstName !== "" ?
                                    user.firstName.split("").map((item, index)=>(
                                        <span key={`${item}-${index}`}>{item}</span>
                                    ))
                                    : null
                                }
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <UserParameters lang={lang} user={user} companies={companiesList} updateUserChange={updateUserChange} userEdit={userEdit}/>
                    </Grid>
                </Grid>
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
        setUserDataToStore: (data) => {dispatch(set_user_data(data))},
        userEdit: (data) => {dispatch(user_edit(data))},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Layout(UserProfile))