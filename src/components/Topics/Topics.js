import React, {useState, useEffect} from 'react'
import {Grid, Paper} from '@material-ui/core'
import {AddCircleTwoTone, MenuBookTwoTone} from '@material-ui/icons'
import {makeStyles} from '@material-ui/core/styles'
import {useToasts} from 'react-toast-notifications'
import {Animated} from 'react-animated-css'
import Loader from 'react-loader-spinner'
import Layout from '../../hoc/layout/Layout'
import TopicsList from './TopicsList'
import AddTopic from './AddTopic'
import API from '../../store/api/API'
import './Topics.scss'

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
}))

function Topics(props) {
    const classes = useStyles()
    const {addToast} = useToasts()
    const [topics, setTopics] = useState([])
    const [openNewTopic, setOpenNewTopic] = useState(false)
    const [showLoader, setShowLoader] = useState(true)
    const [resetValue, setResetValue] = useState(true)
    const {lang} = props

    useEffect(function () {
        getTopics()
    }, [])

    const handleOpenNewTopic = () => {
        setOpenNewTopic(true)
    }

    const closeAddTopic = () => {
        setOpenNewTopic(false)
    }

    const getTopics = () => {
        const token = localStorage.getItem("userToken")
        if(token){
            API.getTopics(token).then(res => {
                if(res && res.length > 0){
                    setTopics(res)
                }else{
                    addToast(lang.topics_list_empty, {
                        appearance: 'warning', autoDismiss: true
                    })
                }
                setShowLoader(false)
            }).catch(error => {
                addToast(error.message, {
                    appearance: 'error', autoDismiss: true
                })
                setShowLoader(false)
            })
        }
    }

    const vote = (id, type) => {
        const token = localStorage.getItem("userToken")
        API.voteForTopic(token, id, type).then(res => {
            if(res.result){
                const msg = type === "like" ? lang.success_vote : lang.canceled_vote
                const msgType = type === "like" ? 'success' : 'info'
                addToast(msg, {
                    appearance: msgType, autoDismiss: true
                })
                getTopics()
            }else{
                addToast(lang.error_vote, {
                    appearance: 'error', autoDismiss: true
                })
            }
        }).catch(error => {
            addToast(error.message, {
                appearance: 'error', autoDismiss: true
            })
        })
    }

    const deleteTopic = (id) => {
        const token = localStorage.getItem("userToken")
        API.deleteTopicById(token, id).then(res => {
            if(res.result){
                addToast(lang.success_delete_topic, {
                    appearance: 'success', autoDismiss: true
                })
                getTopics()
            }else{
                addToast(lang.error_delete_topic, {
                    appearance: 'error', autoDismiss: true
                })
            }
        }).catch(error => {
            addToast(error.message, {
                appearance: 'error', autoDismiss: true
            })
        })
    }

    const addNewTopic = (topic) => {
        const token = localStorage.getItem("userToken")
        API.addTopic(token, topic).then(res => {
            if(res.result){
                addToast(lang.success_added_new_topic, {
                    appearance: 'success', autoDismiss: true
                })
                getTopics()
                setResetValue(!resetValue)
            }else{
                addToast(lang.error_add_new_topic, {
                    appearance: 'error', autoDismiss: true
                })
            }
        }).catch(error => {
            addToast(error.message, {
                appearance: 'error', autoDismiss: true
            })
        })
    }

    return (
        <div className={"main-container topics-container"}>
            <div className={`${classes.root} topics-main-content`}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <div className={"topics-title"}>
                            <p>{lang.topics}</p>
                        </div>
                    </Grid>
                    { !showLoader ?
                        <Grid item xs={12} className={"topics-container"}>
                            <Animated animationIn="zoomIn" animationOut="zoomOut" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
                                <div className={"topics-list-content"}>
                                    <div className={`${classes.root} topics-content`}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <div className={'topics-list-title'}>
                                                    <h3><MenuBookTwoTone />
                                                        <span>{!openNewTopic ? lang.all_topics : lang.add_new_topic}</span>
                                                    </h3>
                                                    {!openNewTopic ?
                                                        <span className={"add-new-topic"} onClick={()=>handleOpenNewTopic()}>{lang.add} <AddCircleTwoTone /></span>
                                                        : null
                                                    }
                                                </div>
                                            </Grid>
                                            {topics.length > 0 && !openNewTopic ?
                                                <TopicsList lang={lang} topics={topics} vote={vote} deleteTopic={deleteTopic}/>
                                                : null
                                            }
                                            { openNewTopic ?
                                                <AddTopic
                                                    lang={lang}
                                                    resetValue={resetValue}
                                                    closeAddTopic={closeAddTopic}
                                                    addNewTopic={addNewTopic}/> : null
                                            }
                                        </Grid>
                                    </div>
                                </div>
                            </Animated>
                        </Grid> :
                        <Grid item xs={12} className={"loader-container"}>
                            <Paper className={`${classes.paper}`}>
                                <div className={"loader-body"}>
                                    <Loader type="Bars" color="grey" height={100} width={100}/>
                                    <span>{lang.loading_data}</span>
                                </div>
                            </Paper>
                        </Grid>
                    }
                </Grid>
            </div>
        </div>
    )
}

export default Layout(Topics)
