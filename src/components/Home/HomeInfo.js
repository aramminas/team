import React, {useState, useEffect} from "react"
import {Grid} from '@material-ui/core'
import {PeopleAlt, EmojiObjects, Business, TrendingUp} from '@material-ui/icons'
import {Animated} from "react-animated-css"
import ScrollListener from 'react-scroll-listen'

function HomeInfo(props) {
    const [scroll, setScroll] = useState({scrollPosition: 0})
    const [showAdvices,setShowAdvices] = useState(false)

    useEffect(() => {
        if(scroll.scrollPosition > 200){
            setShowAdvices(true)
        }else{
            setShowAdvices(false)
        }
    },[scroll])
    
    const {lang} = props

    const infoData =[
        {
            id: 1,
            icon: <PeopleAlt/>,
            info: lang.info_desc_1,
        },
        {
            id: 2,
            icon: <EmojiObjects/>,
            info: lang.info_desc_2
        },
        {
            id: 3,
            icon: <Business/>,
            info: lang.info_desc_3,
        },
        {
            id: 4,
            icon: <TrendingUp/>,
            info: lang.info_desc_4,
        },
    ]

    return (
        <>
            <ScrollListener
                onScroll={value => setScroll({scrollPosition: value})}
            />
            <div className={"info-section-container"}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Animated animationIn="zoomIn" animationOut="fadeOut" animationInDuration={3000} animationOutDuration={1000} isVisible={showAdvices}>
                            <h2 className={"info-main-title"}>{lang.info_title}</h2>
                        </Animated>
                    </Grid>
                    { infoData.map(item => (
                        <Grid item xs={6} key={item.id}>
                            <Animated animationIn={item.id%2 === 0 ? "fadeInLeft": "fadeInRight"} animationOut="fadeOut" animationInDuration={5000} animationOutDuration={1000} isVisible={showAdvices}>
                                <div className={"info-content"}>
                                    <div className={"info-wrapper"}>
                                        <h2 className={"info-title"}>{item.icon}</h2>
                                        <div className={"info-dsc"}>
                                            {item.info}
                                        </div>
                                    </div>
                                </div>
                            </Animated>
                        </Grid>
                    ))
                    }
                </Grid>
            </div>
        </>
    )
}

export default HomeInfo