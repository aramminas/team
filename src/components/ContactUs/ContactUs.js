import React, {useState, useEffect} from 'react'
import {connect, useSelector} from 'react-redux'
import {set_user_data} from  '../../store/actions/userAction'
import {Grid, Button} from '@material-ui/core'
import {BusinessTwoTone,
    LocationOnTwoTone,
    ContactPhoneTwoTone,
    PhoneIphoneTwoTone,
    PhoneInTalkTwoTone,
    EmailTwoTone,
} from '@material-ui/icons'
import Layout from '../../hoc/layout/Layout'
import reg from '../../constants'
import API from '../../store/api/API'
import {Animated} from 'react-animated-css'
import './ContactUs.scss'


const initMessageData = {
    name: "",
    email: "",
    message: " ",
}

const initValidator = {
    name: false,
    email: false,
    message: false,
    main: false,
}

function ContactUs(props) {
    const [messageData, setMessageData] = useState(initMessageData)
    const [validator, setValidator] = useState(initValidator)
    const {user} = useSelector(state => state)
    const {lang} = props

    useEffect(function () {
        const token = localStorage.getItem("userToken")
        if(user.email && user.firstName && user.lastName){
            setMessageData((prevState) => {
                return {...prevState, name: `${user.firstName} ${user.lastName}`, email: user.email}
            })
        }else if(token && token !== ""){
            API.getUserData(token)
                .then(result => {
                    props.setUserDataToStore({...result})
                    setMessageData((prevState) => {
                        return {...prevState, name: `${result.firstName} ${result.lastName}`, email: result.email}
                    })
                }).catch(error => {
                    console.log('error', error)
                })
        }
    }, [user.email, user.firstName, user.lastName])

    const handleChange = (ev) => {
        let value = ev.target.value
        let name = ev.target.name
        let valid = false
        setMessageData((prevState) => {
            return {...prevState, [name]: value}
        })

        if(name === "name"){
            valid = reg.full_name_reg.test(value)
        }else if(name === "email"){
            valid = reg.email_reg.test(String(value).toLowerCase())
        }else if(name === "message"){
            valid = value.trim() !== ""
        }

        setValidator((prevState) => {
            return {
                ...prevState,
                [name]: valid,
                main: false,
            }
        })
    }

    const onSubmit = () => {
        const {name, email , message } = messageData
        const {name: valName, email: valEmail , message: valeMessage } = validator

        if(name === "" || !valName || email === "" || !valEmail || message === "" || !valeMessage){
            setValidator((prevState) => {
                return {...prevState,
                    main: true,
                }
            })
        }else {
            document.getElementById("messages").submit()
        }
    }

    return (
        <div className={"main-container contact-us-content"}>
            <div className={"contact-us-root"}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <section className={"contact-us-title"}>
                            <Animated animationIn="flipInX" animationOut="zoomOut" animationInDuration={2000}
                                      animationOutDuration={1000} isVisible={true}>
                                <figure>
                                    <img src="/images/contactUs/contact-us.png" alt="contact us"/>
                                </figure>
                            </Animated>
                        </section>
                    </Grid>
                    <Grid item xs={12}>
                        <Animated animationIn="zoomIn" animationOut="zoomOut" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
                            <div className={"contact-form"}>
                                <form
                                    id={"messages"}
                                    action="https://formspree.io/xzbpwkjk"
                                    method="POST"
                                >
                                    <label htmlFor="name">{lang.full_name}:</label>
                                    <input
                                        id={"name"}
                                        type="text"
                                        name={"name"}
                                        value={messageData.name}
                                        onChange={(e)=>handleChange(e)}
                                    />
                                    {(!validator.name && messageData.name !== "")  &&
                                    <span className={"error-message"}>{lang.error_name}</span>
                                    }
                                    <label htmlFor="email">{lang.e_mail}:</label>
                                    <input
                                        id={"email"}
                                        type="text"
                                        name={"email"}
                                        value={messageData.email}
                                        onChange={(e)=>handleChange(e)}
                                    />
                                    {(!validator.email && messageData.email !== "") &&
                                    <span className={"error-message"}>{lang.error_email}</span>
                                    }
                                    <label htmlFor="message">{lang.message}:</label>
                                    <textarea
                                        id={"message"}
                                        name="message"
                                        cols="30" rows="10"
                                        value={messageData.message}
                                        onChange={(e)=>handleChange(e)}
                                    />
                                    {(!validator.message && messageData.message !== " ") &&
                                    <span className={"error-message"}>{lang.error_message}</span>
                                    }
                                    {validator.main &&
                                    <span className={"error-message"}>{lang.error_main}</span>
                                    }
                                    <div className={"send-messages"}>
                                        <Button variant="contained" color="primary" onClick={() => onSubmit()}>
                                            {lang.send}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </Animated>
                    </Grid>
                    <Grid item xs={6} className={"contact-us-address-container"}>
                        <Animated animationIn="fadeInUp" animationOut="fadeOutDown" animationInDuration={3000} animationOutDuration={1000} isVisible={true}>
                            <div className={"contact-us-address"}>
                                <h3><BusinessTwoTone /> <span>{lang.address}</span></h3>
                                <div className={"contact-info"}>
                                    <p><LocationOnTwoTone /> <span>{lang.address_1}</span></p>
                                    <p><span>{lang.address_2}</span></p>
                                </div>
                            </div>
                        </Animated>
                    </Grid>
                    <Grid item xs={6}>
                        <Animated animationIn="fadeInUp" animationOut="fadeOutDown" animationInDuration={3000} animationOutDuration={1000} isVisible={true}>
                            <div className={"contact-us-contacts"}>
                                <h3><ContactPhoneTwoTone /> <span>{lang.contacts}</span></h3>
                                <div className={"contact-info"}>
                                    <p><EmailTwoTone /> <span>{lang.contact_email}</span></p>
                                    <p><PhoneIphoneTwoTone /> <span>{lang.contact_phone}</span></p>
                                    <p><PhoneInTalkTwoTone /> <span>{lang.contact_telephone}</span></p>
                                </div>
                            </div>
                        </Animated>
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
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Layout(ContactUs))