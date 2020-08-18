import React, {useState, useEffect} from 'react'
import {Grid, Paper} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {useToasts} from 'react-toast-notifications'
import Loader from 'react-loader-spinner'
import {Animated} from 'react-animated-css'
import Layout from '../../hoc/layout/Layout'
import ProjectsList from './ProjectsList'
import API from '../../store/api/API'
import './Projects.scss'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
}))

function Projects(props) {
    const {addToast} = useToasts()
    const classes = useStyles()
    const [projects, setProjects] = useState([])
    const {lang} = props

    useEffect(function () {
        getProjects()
    }, [])

    const getProjects = () => {
        const token = localStorage.getItem("userToken")
        if(token){
            API.getProjects(token).then(res => {
                if(res && res.length > 0){
                    setProjects([...res])
                }else{
                    addToast(lang.project_list_empty, {
                        appearance: 'warning', autoDismiss: true
                    })
                }
            }).catch(error => {
                addToast(error.message, {
                    appearance: 'error', autoDismiss: true
                })
            })
        }
    }

    const vote = (id, type) => {
        const token = localStorage.getItem("userToken")
        API.voteForProject(token, id, type).then(res => {
            if(res.result){
                const msg = type === "like" ? lang.success_vote : lang.canceled_vote
                const msgType = type === "like" ? 'success' : 'info'
                addToast(msg, {
                    appearance: msgType, autoDismiss: true
                })
                getProjects()
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

    return (
        <div className={"main-container"}>
            <div className={`${classes.root} projects-main-content`}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <div className={"projects-title"}>
                            {/*<p>{lang.projects}</p>*/}
                            {/*<p id="ref-l">{lang.projects}</p>*/}
                            <h3><p>{lang.projects}</p></h3>
                        </div>
                    </Grid>
                    {projects.length > 0 ?
                        <Grid item xs={12} className={"projects-container"}>
                            <Animated animationIn="zoomIn" animationOut="zoomOut" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
                                <ProjectsList lang={lang} projects={projects} vote={vote}/>
                            </Animated>
                        </Grid>
                        :
                        <Grid item xs={12} className={"loader-container"}>
                            <Paper className={`${classes.paper}`}>
                                <div>
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

export default Layout(Projects)
