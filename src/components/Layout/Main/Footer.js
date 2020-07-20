import React from "react"
import {NavLink} from 'react-router-dom'
import {Facebook, Twitter, LinkedIn, Instagram, Pinterest} from '@material-ui/icons'

function Footer(props) {
    const {lang} =props

    return (
        <footer className={"main-footer"}>
            <div className={"main-footer-content"}>
                <div className={"footer-site-link"}>{lang.site_by}&nbsp;
                    <NavLink to={`/`} variant="body2">
                        {lang.site_name}
                    </NavLink>
                </div>
                <div className={"footer-contacts-links"}>
                    <p>
                        <NavLink to={`/contact-us`} variant="body2">
                            {lang.contacts}
                        </NavLink>
                        <a href={`https://www.facebook.com/`} target="_blank" rel="noopener noreferrer"><Facebook /></a>
                        <a href={`https://twitter.com/`} target="_blank" rel="noopener noreferrer"><Twitter /></a>
                        <a href={`https://www.linkedin.com/`} target="_blank" rel="noopener noreferrer"><LinkedIn /></a>
                        <a href={`https://www.instagram.com/`} target="_blank" rel="noopener noreferrer"><Instagram /></a>
                        <a href={`https://www.pinterest.com/`} target="_blank" rel="noopener noreferrer"><Pinterest /></a>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer