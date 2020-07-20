import React, {useState, useEffect} from 'react'
import {NavLink, Redirect, useRouteMatch} from 'react-router-dom'
import {connect, useSelector} from 'react-redux'
import {set_user_data} from  '../../../store/actions/userAction'
import {AccountCircle} from '@material-ui/icons'
import MenuIcon from '@material-ui/icons/Menu'
import {Menu, MenuItem, IconButton} from '@material-ui/core'
import API from '../../../store/api/API'
import './Main.scss'

const initUserState = {
    avatarUrl: "",
    birthDate: "",
    companyId: "",
    email: "",
    firstName: "",
    jsExperience: "",
    lastName: "",
    reactExperience: "",
    sex: "",
    token: "",
}

function Header(props) {
    const [anchorEl, setAnchorEl] = useState(null)
    const {user} = useSelector(state => state)
    const [redirectTo, setRedirectTo]= useState(false)
    let match = useRouteMatch()
    const {lang} = props

    useEffect(function () {
        const token = localStorage.getItem("userToken")
        if(token && token !== ""){
            API.getUserData(token).then(result => {
                props.setUserDataToStore({...result})
            }).catch(error => {
                console.log('error', error)
            })
        }

        if(match.path === "/" && redirectTo === true){
            setRedirectTo(false)
        }

    },[redirectTo])

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleCloseMenu = () => {
        setAnchorEl(null)
    }

    const signOut = (ev) => {
        ev.preventDefault()
        const token = localStorage.getItem("userToken")
        if(token && token !== ""){
            API.logout(token).then(result => {
                if(Object.keys(result).length > 0){
                    props.setUserDataToStore({...initUserState})
                    localStorage.clear()
                    setRedirectTo(true)
                }
                }).catch(error => {
                    console.log('error', error)
                })
        }
    }

    if (redirectTo === true) {
        return <Redirect to="/"/>
    }

    return (
        <header className="main-header">
            <div id="header-inner">
                <div className="header-slide">
                    <ul className="header-inner-primary">
                        <li className="left">
                            <NavLink to={`/`} variant="body2" className={"link-unset site-logo"}>
                                <figure className={"main-logo"}>
                                    <img src="/images/logo-b.png" alt="logo"/>
                                </figure>
                                <span>{lang.site_name}</span>
                            </NavLink>
                        </li>
                        <div className="menu-primary-menu-container">
                            <ul id="menu-primary-menu" className="menu">
                                <li>
                                    <NavLink to={`/`} exact variant="body2" className={"link-unset"} activeClassName="active">
                                        {lang.home}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={`/contact-us`} variant="body2" className={"link-unset"} activeClassName="active">
                                        {lang.contact_us}
                                    </NavLink>
                                </li>
                                { user.firstName &&
                                    <>
                                        <li>
                                            <NavLink to={`/main`} variant="body2" className={"link-unset"} activeClassName="active">
                                                {lang.main}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={`/teams`} variant="body2" className={"link-unset"} activeClassName="active">
                                                {lang.teams}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={`/topics`} variant="body2" className={"link-unset"} activeClassName="active">
                                                {lang.topics}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={`/projects`} variant="body2" className={"link-unset"} activeClassName="active">
                                                {lang.projects}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={`/user-profile`} variant="body2" className={"link-unset"} activeClassName="active">
                                                {lang.user_profile}
                                            </NavLink>
                                        </li>
                                    </>
                                }
                            </ul>
                        </div>
                        <li className="right">
                            <div>
                                <IconButton aria-controls="user-nav-menu" aria-haspopup="true" className={"user-menu-btn"}
                                    onClick={handleOpenMenu}>
                                    { user.firstName ?
                                        <span className={"user-nav-menu-name"}>{user.firstName}</span> : null}
                                        <AccountCircle />
                                </IconButton>
                                { user.firstName ?
                                    <Menu
                                        id="user-nav-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleCloseMenu}
                                        className={"user-menu-content"}
                                    >
                                        <MenuItem onClick={handleCloseMenu}>
                                            <a href={`/`} className={"link-unset"} onClick={signOut}>
                                                {lang.sign_out}
                                            </a>
                                        </MenuItem>
                                    </Menu> :
                                    <Menu
                                        id="user-nav-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleCloseMenu}
                                        className={"user-menu-content"}
                                    >
                                        <MenuItem onClick={handleCloseMenu}>
                                            <NavLink to={`/sign-in`} variant="body2" className={"link-unset"}>
                                                {lang.sign_in}
                                            </NavLink>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseMenu}>
                                            <NavLink to={`/sign-up`} variant="body2" className={"link-unset"}>
                                                {lang.sign_up}
                                            </NavLink>
                                        </MenuItem>
                                    </Menu>
                                }
                            </div>
                        </li>
                    </ul>
                    <div className="header-inner-secondary">
                        <MenuIcon />
                    </div>
                </div>
            </div>
        </header>
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

export default connect(mapStateToProps,mapDispatchToProps)(Header)