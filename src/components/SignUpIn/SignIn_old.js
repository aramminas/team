import React, {useState} from 'react'
import {NavLink, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {set_user_data} from  '../../store/actions/userAction'
import {Avatar, Button, TextField, Grid, Box, Typography, Container} from '@material-ui/core'
import {LockOutlined} from '@material-ui/icons'
import 'date-fns'
import {Animated} from "react-animated-css"
import {useToasts} from "react-toast-notifications"
import Layout from '../../hoc/layout/Layout'
import Copyright from '../General/Copyright'
import reg from '../../constants'
import API from '../../store/api/API'
import './SignUpIn.scss'

const initUserData = {
    email: "",
    password: "",
}

const initValidator = {
    email: false,
    password: false,
}


function SignIn(props) {
    const {addToast} = useToasts()
    const [userData, setUserData] = useState(initUserData)
    const [validator, setValidator] = useState(initValidator)
    const [redirectTo, setRedirectTo]= useState(false)
    const {lang} = props

    const handleChangeData = (ev) => {
        const name = ev.target.name
        let value = ev.target.value
        setUserData(prevState => {
            return {
                ...prevState,
                [name]: value,
            }
        })

        switch (name) {
            case "email":
                !reg.email_reg.test(value) ?
                    setValidator(prevState => {return {...prevState, [name]: true}}) :
                    setValidator(prevState => {return {...prevState, [name]: false}})
                break
            case "password":
                !reg.pass_reg.test(value) ?
                    setValidator(prevState => {return {...prevState, [name]: true}}) :
                    setValidator(prevState => {return {...prevState, [name]: false}})
                break
            default:
                return validator
        }
    }


    const handleSubmit = (ev) => {
        ev.preventDefault()
        let {email, password} = validator
        if(email || password){
            addToast(lang.all_fields_required, {
                appearance: 'error',
                autoDismiss: true
            })
            return false
        }

        API.signInUser({...userData}).then(res => {
            if(res.token !== "" && res.firstName !== ""){
                props.setUserDataToStore({...res})
                localStorage.setItem("userToken", res.token)
                setRedirectTo(true)
            }
        }).catch(error => {
            addToast(error.message, {
                appearance: 'error',
                autoDismiss: true
            })
        })
    }

    if (redirectTo === true) {
        return <Redirect to="/main"/>
    }

    return (
        <div className={'main-container sign-up-in-container'}>
            <Animated animationIn="zoomIn" animationOut="zoomOutDown" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
                <Container component="main" maxWidth="xs">
                    <div className={`sign-up-in-content`}>
                        <Avatar className={"sign-up-in-avatar"}>
                            <LockOutlined />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {lang.sign_in}
                        </Typography>
                        <form className={"sign-up-in-form"} onSubmit={(ev)=>handleSubmit(ev)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        className={"input-styles"}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label={lang.email_address}
                                        name="email"
                                        autoComplete="email"
                                        error={validator.email}
                                        value={userData.email}
                                        onChange={(ev)=>handleChangeData(ev)}
                                        helperText={validator.email && "Incorrect entry."}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        className={"input-styles"}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label={lang.password}
                                        type="password"
                                        autoComplete="current-password"
                                        error={validator.password}
                                        value={userData.password}
                                        onChange={(ev)=>handleChangeData(ev)}
                                        helperText={validator.password && "Incorrect entry."}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={"sign-up-in-submit-btn"}
                            >
                                {lang.sign_in}
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <NavLink to={`/sign-up`} variant="body1" className={"sign-up-in-link"}>
                                        {lang.do_not_have_account}
                                    </NavLink>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    <Box mt={5}>
                        <Copyright lang={lang}/>
                    </Box>
                </Container>
            </Animated>
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
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Layout(SignIn))