import React from 'react'
import {NavLink} from 'react-router-dom'
import Layout from '../../hoc/layout/Layout'
import {Animated} from 'react-animated-css'

/* styles */
import './NotFound404.scss'
const layout = 'not-found'

function NotFound404(props) {
    const {lang} = props

    return (
        <div className={"not-found-content"}>
            <section className={"not-found-section"}>
                <div className={"not-found-image"}>
                    <img className={"gradient"} src="/images/gradient.png" alt="background"/>
                    <section className={"not-found-message-section"}>
                        <Animated animationIn="fadeInLeft" animationOut="fadeOut" animationInDuration={2000} animationOutDuration={1000} isVisible={true}>
                            <h1>{lang.welcome}</h1>
                            <h5>{lang.not_found_msg_1}</h5>
                            <p>{lang.not_found_msg_2}</p>
                            <p>
                                <NavLink to={`/contact-us`} variant="body2">
                                    {lang.write_to_us} »
                                </NavLink>
                            </p>
                        </Animated>
                    </section>
                </div>
            </section>

        </div>
    )
}

export default Layout(NotFound404, layout)