import React from 'react'
import {Facebook, Twitter, LinkedIn, Instagram, Pinterest} from '@material-ui/icons'
import {Animated} from 'react-animated-css'
import './NotFound.scss'

function Header() {

    const linksData = [
        {
            url: "https://www.facebook.com/",
            icon: <Facebook />,
        },
        {
            url: "https://twitter.com/",
            icon: <Twitter />,
        },
        {
            url: "https://www.linkedin.com/",
            icon: <LinkedIn />,
        },
        {
            url: "https://www.instagram.com/",
            icon: <Instagram />,
        },
        {
            url: "https://www.pinterest.com/",
            icon: <Pinterest />,
        },
    ]

    return (
        <header className={"not-found-header"}>
            <nav className="social-nav">
                <ul>
                    {linksData.map((item, index) => (
                        <li key={index}>
                            <Animated animationIn="fadeInDown" animationOut="fadeOut"
                                      animationInDuration={index * 1000 + 1000} animationOutDuration={1000}
                                      isVisible={true}>
                                <a href={item.url} target="_blank" rel="noopener noreferrer">{item.icon}</a>
                            </Animated>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}

export default Header