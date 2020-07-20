import React, {useState, useEffect} from 'react'
import {NavLink, Redirect} from 'react-router-dom'
import {Avatar, Button, TextField,
    Grid, Box, Typography, Container, Radio,
    RadioGroup, FormControlLabel, FormLabel, FormControl,
    InputLabel, MenuItem, Select, FormHelperText} from '@material-ui/core'
import {LockOutlined, PanoramaOutlined} from '@material-ui/icons'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers'
import {Animated} from "react-animated-css"
import {useToasts} from "react-toast-notifications"
import Layout from '../../hoc/layout/Layout'
import Copyright from '../General/Copyright'
import convertData from '../../helpers/convertData'
import constData from '../../constants'
import API from '../../store/api/API'
import './SignUpIn.scss'
import FirebaseFunctions from "../../helpers/FirebaseFunctions"

const initUserData = {
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    sex: "",
    avatarUrl: "",
    password: "",
    jsExperience: "",
    reactExperience: "",
    companyId: 0,
}

const initValidator = {
    firstName: false,
    lastName: false,
    email: false,
    birthDate: false,
    sex: false,
    avatarUrl: false,
    password: false,
    jsExperience: false,
    reactExperience: false,
    companyId: false,
}

const initImage = {
    selectedFile: null,
    file: null,
    name: null,
}

function SignUp(props) {
    const {addToast} = useToasts()
    const [userData, setUserData] = useState(initUserData)
    const [validator, setValidator] = useState(initValidator)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [imageData, setImageData] = useState(initImage)
    const [companiesList, setCompaniesList] = useState([])
    const [redirectTo, setRedirectTo]= useState(false)
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
            addToast(error.message, {
                appearance: 'error',
                autoDismiss: true
            })
        })
    }

    const handleChangeData = (ev) => {
        const name = ev.target.name
        let value = ev.target.value
        value = name === "jsExperience" || name === "reactExperience" ? Number(value) : value
        setUserData(prevState => {
            return {
                ...prevState,
                [name]: value,
            }
        })

        switch (name) {
            case "firstName":
            case "lastName":
                !constData.name_reg.test(value) ?
                    setValidator(prevState => {return {...prevState, [name]: true}}) :
                    setValidator(prevState => {return {...prevState, [name]: false}})
                break
            case "email":
                !constData.email_reg.test(value) ?
                    setValidator(prevState => {return {...prevState, [name]: true}}) :
                    setValidator(prevState => {return {...prevState, [name]: false}})
                break
            case "password":
                !constData.pass_reg.test(value) ?
                    setValidator(prevState => {return {...prevState, [name]: true}}) :
                    setValidator(prevState => {return {...prevState, [name]: false}})
                break
            default:
                return validator
        }
    }

    const handleDateChange = (date) => {
        const formatDate = convertData(date)
        setUserData(prevState => {return {...prevState, birthDate: formatDate}})
        setSelectedDate(date)
        setValidator(prevState => {return {...prevState, birthDate: false}})
    }

    const setImage = e => {
        let file = e.target.files[0]
        const reader = new FileReader()
        if(file !== undefined &&
            (file.type === "image/jpeg" || file.type === "image/png" ||
                file.type === "image/jpg" || file.type === "image/gif")){
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setImageData(image => {
                    return {
                        ...image,
                        selectedFile: reader.result,
                        name: `${Date.now()}_${file.name}`,
                        file
                    }
                })
            }
        }else if(file !== undefined){
            addToast(lang.image_warning, {
                appearance: 'warning',
                autoDismiss: true
            })
        }
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()
        let {firstName, lastName, email, birthDate, sex, password, jsExperience, reactExperience, companyId} = validator
        if(firstName || lastName || email || birthDate || sex || password || jsExperience || reactExperience || companyId){
            addToast(lang.all_fields_required, {
                appearance: 'error',
                autoDismiss: true
            })
            return false
        }

        if(userData.birthDate === ""){
            setValidator(prevState => {return {...prevState, birthDate: true}})
            addToast(lang.all_fields_required, {
                appearance: 'error',
                autoDismiss: true
            })
            return false
        }

        if(!imageData.file){
            const defaultImage = constData.defaultAvatar
            setUserData(prevState => {return {...prevState, avatarUrl: defaultImage}})
            registerUser({...userData,avatarUrl: defaultImage})
        }else {
            FirebaseFunctions.uploadImage(imageData).then(res => {
                    if(res.downloadURL && res.downloadURL !== ""){
                        registerUser({...userData,avatarUrl: res.downloadURL})
                    }
                }).catch(error => {
                    addToast(error.message, {
                        appearance: 'error',
                        autoDismiss: true
                    })
                })
        }
    }

    const registerUser = (data) => {
        API.registerNewUser({...data}).then(res => {
            if(res.success){
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
        return <Redirect to="/sign-in"/>
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
                            {lang.sign_up}
                        </Typography>
                        <form className={"sign-up-in-form"} onSubmit={(ev)=>handleSubmit(ev)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        className={"input-styles"}
                                        name="firstName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label={lang.first_name}
                                        autoFocus
                                        error={validator.firstName}
                                        value={userData.firstName}
                                        onChange={(ev)=>handleChangeData(ev)}
                                        helperText={validator.firstName && lang.incorrect_entry}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        className={"input-styles"}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label={lang.last_name}
                                        name="lastName"
                                        autoComplete="lname"
                                        error={validator.lastName}
                                        value={userData.lastName}
                                        onChange={(ev)=>handleChangeData(ev)}
                                        helperText={validator.lastName && lang.incorrect_entry}
                                    />
                                </Grid>
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
                                        helperText={validator.email && lang.incorrect_entry}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            className={"input-styles input-datepicker"}
                                            margin="normal"
                                            fullWidth
                                            required
                                            error={validator.birthDate}
                                            label={lang.birthday}
                                            format="MM/dd/yyyy"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item sm={12}>
                                    <Grid container spacing={3}>
                                        <Grid item sm={12} md={6}>
                                            <Button variant="outlined" component="label" className={"file-btn"}>
                                                <PanoramaOutlined htmlColor={"#ffffff"}/>&nbsp;
                                                {lang.select_image}
                                                <input
                                                    type="file"
                                                    name={"avatar"}
                                                    className={"file-input"}
                                                    onChange={(e)=>setImage(e)}
                                                />
                                            </Button>
                                        </Grid>
                                        <Grid item sm={12} md={6}>
                                            {imageData.selectedFile ?
                                                <div className={"selected-avatar"}>
                                                    <Animated animationIn="zoomInLeft" animationOut="fadeOut" animationInDuration={1500} animationOutDuration={1000} isVisible={true}>
                                                        <figure className={"selected-file"}>
                                                            <img src={imageData.selectedFile} alt="quiz"/>
                                                        </figure>
                                                    </Animated>
                                                </div>
                                                :
                                                null
                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth variant="outlined" className={"input-styles input-select"}>
                                        <InputLabel id="select-company">{lang.company}</InputLabel>
                                        <Select
                                            labelId="select-company"
                                            id="select-company"
                                            name="companyId"
                                            required
                                            error={validator.companyId}
                                            value={userData.companyId === 0 ? "" : userData.companyId}
                                            onChange={(ev)=>handleChangeData(ev)}
                                            label={lang.company}
                                        >
                                            <MenuItem value="">
                                                <em>{lang.none}</em>
                                            </MenuItem>
                                            {companiesList.length > 0 &&
                                            companiesList.map(item => (
                                                <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                                            ))
                                            }
                                        </Select>
                                        {validator.companyId && <FormHelperText>{lang.select_company}</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        className={"input-styles"}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label={lang.js_experience}
                                        name="jsExperience"
                                        type={"number"}
                                        error={validator.jsExperience}
                                        value={userData.jsExperience}
                                        onChange={(ev)=>handleChangeData(ev)}
                                        helperText={validator.jsExperience && lang.incorrect_entry}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        className={"input-styles"}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label={lang.react_experience}
                                        name="reactExperience"
                                        type={"number"}
                                        error={validator.reactExperience}
                                        value={userData.reactExperience}
                                        onChange={(ev)=>handleChangeData(ev)}
                                        helperText={validator.reactExperience && lang.incorrect_entry}
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
                                        helperText={validator.password && lang.incorrect_password_help}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth component="fieldset">
                                        <FormLabel component="legend" className={"sex-label"}>{lang.sex}</FormLabel>
                                        <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                            <FormControlLabel
                                                value="start"
                                                control={
                                                    <Radio
                                                        color="primary"
                                                        checked={userData.sex === 'male'}
                                                        onChange={(ev)=>handleChangeData(ev)}
                                                        value="male"
                                                        name="sex"
                                                        required
                                                        inputProps={{ 'aria-label': lang.male }}
                                                    />
                                                }
                                                label={lang.male}
                                                labelPlacement="start"
                                            />
                                            <FormControlLabel
                                                value="start"
                                                control={
                                                    <Radio
                                                        color="primary"
                                                        checked={userData.sex === 'female'}
                                                        onChange={(ev)=>handleChangeData(ev)}
                                                        value="female"
                                                        name="sex"
                                                        required
                                                        inputProps={{ 'aria-label': lang.female }}
                                                    />
                                                }
                                                label={lang.female}
                                                labelPlacement="start"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={"sign-up-in-submit-btn"}
                            >
                                {lang.sign_up}
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <NavLink to={`/sign-in`} variant="body1" className={"sign-up-in-link"}>
                                        {lang.already_have_account}
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

export default Layout(SignUp)