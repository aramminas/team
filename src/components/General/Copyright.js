import React from 'react'
import {NavLink} from 'react-router-dom'
import {Typography} from '@material-ui/core'
import './General.scss'

function Copyright(props) {
    const {lang} = props
    return (
        <Typography variant="body2" color="textSecondary" align="center" className={"copyright-container"}>
            {`${lang.copyright} © `}
            <NavLink to={`/`} variant="body2">
                {lang.site_name}
            </NavLink>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

export default Copyright