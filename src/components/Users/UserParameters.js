import React, {useState, useEffect} from 'react'
import {Edit, Wc, PanoramaTwoTone, ArrowBackIos, ArrowForwardIos, CancelOutlined, CheckBoxOutlined} from '@material-ui/icons'
import {useToasts} from 'react-toast-notifications'
import Loader from 'react-loader-spinner'
import FirebaseFunctions from '../../helpers/FirebaseFunctions'
import API from '../../store/api/API'
import constData from '../../constants'
import './UserParameters.scss'

const initData = {
    avatarUrl: "",
    birthDate: "",
    companyId: "",
    email: "",
    firstName: "",
    jsExperience: "",
    lastName: "",
    reactExperience: "",
    sex: "",
    password: "",
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

function UserParameters(props) {
    const {addToast} = useToasts()
    const [userData, setUserData] = useState(initData)
    const [validator, setValidator] = useState(initValidator)
    const [editDat, setEditData] = useState(false)
    const [imageData, setImageData] = useState(initImage)
    const [_loader, _setLoader] = useState(false)
    const {lang, user, companies, updateUserChange, userEdit} = props

    useEffect(function () {
        setUserData({...user, password: ""})
    },[user])

    const openEdit = (e) => {
        e.preventDefault()
        setEditData(!editDat)
        userEdit()
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
        delete userData.edit;
        if(!imageData.file){
            updateUserData({...userData})
        }else {
            FirebaseFunctions.uploadImage(imageData).then(res => {
                if(res.downloadURL && res.downloadURL !== ""){
                    updateUserData({...userData,avatarUrl: res.downloadURL})
                }
            }).catch(error => {
                addToast(error.message, {
                    appearance: 'error',
                    autoDismiss: true
                })
            })
        }
    }

    const updateUserData = (data) => {
        _setLoader(true)
        const token = localStorage.getItem("userToken")
        if(data.password === "") delete data.password
        if(data.token || data.token === "") delete data.token
        API.updateUserData({...data}, token).then(res => {
            if(Object.keys(res).length > 0){
                addToast(lang.success_update, {
                    appearance: 'success',
                    autoDismiss: true
                })
                updateUserChange(res)
            }
            setEditData(!editDat)
            _setLoader(false)
            userEdit()
        }).catch(error => {
            _setLoader(false)
            addToast(error.message, {
                appearance: 'error',
                autoDismiss: true
            })
            userEdit()
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
            case "birthDate":
                !constData.birthday_reg.test(value) ?
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

    const setImage = e => {
        e.preventDefault()
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

    const changeCompany = (type) => {
        const current = userData.companyId
        let index = companies.findIndex(item => item.id === current)
        if(type === "next"){
            index += 1
            if(companies[index]){
                setUserData(prevState => {
                    return {...prevState, companyId: companies[index].id}})
            }else{
                setUserData(prevState => {
                    return {...prevState, companyId: companies[0].id}})
            }
        }else if(type === "previous"){
            index -= 1
            if(companies[index]){
                setUserData(prevState => {
                    return {...prevState, companyId: companies[index].id}})
            }else{
                index = companies.length - 1
                setUserData(prevState => {
                    return {...prevState, companyId: companies[index].id}})
            }
        }
    }

    const changeSex = (type) => {
        setUserData(prevState => {
            return {...prevState, sex: type}})
    }

    const style = user.edit ?  "": "white"

    return (
        <div className={`content-user-parameters ${style}`}>
            <form className={`${editDat ? "green-color" : "blue-color"}`} onSubmit={(ev)=>handleSubmit(ev)}>
                <div className="segment main-segment">
                    <h1>{lang.personal_data}</h1>
                </div>
                <div className={"content-user-avatar"}>
                    <figure>
                        <img src={ imageData.selectedFile ? imageData.selectedFile :
                                    userData.avatarUrl !== "" ? userData.avatarUrl : constData.defaultAvatar
                        } alt="avatar"/>
                    </figure>
                    {editDat &&
                        <label className="unit icon-user-avatar">
                            <PanoramaTwoTone/>
                            <input
                                type="file"
                                name={"avatar"}
                                className={"file-input"}
                                onChange={(e)=>setImage(e)}
                            />
                        </label>}
                </div>
                <label htmlFor="firstName" className={"input-title"}>{lang.first_name}</label>
                <label>
                    <input type="text" id={"firstName"} name={"firstName"}
                           placeholder={lang.first_name} value={userData.firstName}
                           disabled={!editDat} onChange={(ev)=>handleChangeData(ev)}/>
                    {validator.firstName && <span className={"user-error-input-message"}>{lang.incorrect_entry}</span>}
                </label>
                <label htmlFor="lastName" className={"input-title"}>{lang.last_name}</label>
                <label>
                    <input type="text" id={"lastName"}
                           name={"lastName"} placeholder={lang.last_name}
                           value={userData.lastName} disabled={!editDat} onChange={(ev)=>handleChangeData(ev)}/>
                    {validator.lastName && <span className={"user-error-input-message"}>{lang.incorrect_entry}</span>}
                </label>
                <label htmlFor="email" className={"input-title"}>{lang.email}</label>
                <label>
                    <input type="email" id={"email"} name={"email"}
                           placeholder={lang.email_address} value={userData.email}
                           disabled={!editDat} onChange={(ev)=>handleChangeData(ev)}/>
                    {validator.email && <span className={"user-error-input-message"}>{lang.incorrect_entry}</span>}
                </label>
                <label htmlFor="birthDate" className={"input-title"}>
                    {lang.birthday} {editDat && <span className={"date-format-type"}>/yyyy-mm-dd/</span>}
                </label>
                <label>
                    <input type="text" id={"birthDate"} name={"birthDate"}
                           placeholder={lang.birthday} value={userData.birthDate}
                           disabled={!editDat} onChange={(ev)=>handleChangeData(ev)}/>
                    {validator.birthDate && <span className={"user-error-input-message"}>{lang.wrong_date_format}</span>}
                </label>
                <label htmlFor="company" className={"input-title"}>{lang.company}</label>
                <label>
                    <input type="text" id={"company"} name={"birthDate"}
                       placeholder={lang.company} defaultValue={
                            (function(companies, id) {
                                if(companies.length > 0){
                                    const company = companies.filter(comp => comp.id === id)
                                    if(company.length > 0){
                                        return company[0].name
                                    }
                                }
                                return ""
                            })(companies, userData.companyId)
                       }
                       disabled={!editDat} />
                </label>
                { editDat &&
                    <div className="segment company-segment">
                        <label className={"input-company-prev"}>{lang.previous}</label>
                        <button className="unit" type="button" onClick={()=>changeCompany("previous")}><ArrowBackIos /></button>
                        <button className="unit" type="button" onClick={()=>changeCompany("next")}><ArrowForwardIos /></button>
                        <label className={"input-company-next"}>{lang.next}</label>
                    </div>
                }
                <label htmlFor="jsExperience" className={"input-title"}>{lang.js_experience}</label>
                <label>
                    <input type="number" id={"jsExperience"} name={"jsExperience"}
                           placeholder={lang.js_experience} value={userData.jsExperience}
                           disabled={!editDat} onChange={(ev)=>handleChangeData(ev)}/>
                    {validator.jsExperience && <span className={"user-error-input-message"}>{lang.incorrect_entry}</span>}
                </label>
                <label htmlFor="reactExperience" className={"input-title"}>{lang.react_experience}</label>
                <label>
                    <input type="number" id={"reactExperience"} name={"reactExperience"}
                           placeholder={lang.react_experience} value={userData.reactExperience}
                           disabled={!editDat} onChange={(ev)=>handleChangeData(ev)}/>
                    {validator.reactExperience && <span className={"user-error-input-message"}>{lang.incorrect_entry}</span>}
                </label>
                <label htmlFor="sex" className={`input-title ${editDat ? "sex-active" : ""}`}>{lang.sex}</label>
                { editDat ?
                    <div className="segment segment-sex">
                        <label className={"input-title input-sex"}>{lang.male}</label>
                        <button className="unit" type="button" onClick={()=>changeSex("male")}>
                            <span className={`icon-male-sex ${userData.sex === "male" ? "active" : ""}`}><Wc /></span>
                        </button>
                        <label className={"input-title input-sex"}>{lang.female}</label>
                        <button className="unit" type="button" onClick={()=>changeSex("female")}>
                            <span className={`icon-female-sex ${userData.sex === "female" ? "active" : ""}`}><Wc /></span>
                        </button>
                    </div> :
                    <label>
                        <input type="text" id={"sex"} placeholder={lang.sex} defaultValue={userData.sex}
                               disabled={!editDat} />
                    </label>
                }
                { editDat &&
                    <>
                        <label htmlFor="password" className={"input-title"}>{lang.password}</label>
                        <label>
                            <input type="password" id={"password"}
                                   name={"password"} value={userData.password} placeholder={lang.password}
                                   onChange={(ev)=>handleChangeData(ev)}
                            />
                            {validator.password && <span className={"user-error-input-message"}>{lang.incorrect_password_help}</span>}
                        </label>
                    </>
                }
                {editDat ?
                    <>
                        <div className="input-group">
                            <button className="unit edit-cancel" type="button" onClick={(e)=>openEdit(e)}><CancelOutlined /></button>
                            <button className={`edit-btn green`} type={"submit"} disabled={_loader}>
                                <CheckBoxOutlined className="icon"/> {lang.save}
                                {_loader ?
                                    <figure className={"user-update-loader"}>
                                        <Loader type="ThreeDots" color="#0057ff" height={15} width={40}/>
                                    </figure> : null
                                }
                            </button>
                        </div>
                    </>
                    :
                    <button className={`edit-btn blue`} type={"button"} onClick={(e)=>openEdit(e)}>
                        <Edit className="icon"/> {lang.edit}
                    </button>
                }
            </form>
        </div>
    )
}

export default UserParameters