import React from 'react'
import {connect} from 'react-redux'
import {change_home_state, get_all_users_data} from  '../../store/actions/homeAction'
import Layout from '../../hoc/layout/Layout'
import HomeInfo from './HomeInfo'
import {Animated} from 'react-animated-css'
import './Home.scss'

const Home = (props) => {
    const {lang} = props
    return (
        <div className={'main-container home-content'}>
            <section className={"main-section"}>
                <div className={"main-section-images-container"}>
                    <figure>
                        <img className={"g"} src="/images/gradient.png" alt="gradient"/>
                    </figure>
                    <div className={"site-name-title"}>
                        <div className="shadows">
                            {lang.site_name.split("").map((item, index)=>(
                                <span key={`${item}-${index}`}>{item}</span>
                            ))}
                        </div>
                    </div>
                    <div className={"main-section-welcome-container"}>
                        <Animated animationIn="zoomIn" animationOut="fadeOut" animationInDuration={2500} animationOutDuration={1000} isVisible={true}>
                            <h2>{lang.welcome_msg_title}</h2>
                        </Animated>
                        <Animated animationIn="zoomIn" animationOut="fadeOut" animationInDuration={3000} animationOutDuration={1000} isVisible={true}>
                            <p>{lang.welcome_msg_1}</p>
                            <p>{lang.welcome_msg_2}</p>
                        </Animated>
                    </div>
                </div>
            </section>
            <section className={"info-section"}>
                <HomeInfo lang={lang}/>
            </section>
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
        changeHomeState: (data) => {dispatch(change_home_state(data))},
        getUserData: () => {dispatch(get_all_users_data())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Layout(Home))