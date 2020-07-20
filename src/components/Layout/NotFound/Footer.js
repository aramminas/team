import React from 'react'
import {NavLink} from 'react-router-dom'

function Footer(props) {
    const {lang} = props

    return (
        <footer className={"not-found-footer"}>
            <section>
                <div className={"not-found-logo"}>
                    <NavLink to={`/`} variant="body2" className={"link-unset site-logo"}>
                        <figure className={"main-logo"}>
                            <img src="/images/logo-w.png" alt="logo"/>
                        </figure>
                        <span>{lang.site_name}</span>
                    </NavLink>
                </div>
                <nav className="not-found-nav">
                    <ul>
                        <li>
                            <NavLink to={`/`} variant="body2">
                                {lang.home}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/contact-us`} variant="body2">
                                {lang.contact_us}
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </section>
        </footer>
    )
}

export default Footer