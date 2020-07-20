import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Paper} from '@material-ui/core'
import {DeleteOutline} from '@material-ui/icons'
import {useToasts} from 'react-toast-notifications'
import Loader from 'react-loader-spinner'
import Layout from '../../hoc/layout/Layout'
import TeamsList from './TeamsList'
import API from '../../store/api/API'
import './Teams.scss'

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
}))

function Teams(props) {
    const classes = useStyles()
    const {addToast} = useToasts()
    const [teams, setTeams] = useState([])
    const [emptyData, setEmptyData] = useState(false)
    const [showLoader, setShowLoader] = useState(true)
    const {lang} = props

    useEffect(function () {
        getTeams()
    }, [])

    const getTeams = () => {
        const token = localStorage.getItem("userToken")
        if(token){
            API.getTeams(token).then(res => {
                if(res && res.length > 0){
                    setTeams(res)
                    setShowLoader(false)
                }else{
                    addToast(lang.teams_list_empty, {
                        appearance: 'warning', autoDismiss: true
                    })
                    setEmptyData(true)
                }
            }).catch(error => {
                addToast(error.message, {
                    appearance: 'error', autoDismiss: true
                })
                setEmptyData(true)
            })
        }
    }

    return (
        <div className={"main-container teams-container"}>
            <div className={`${classes.root} teams-main-content`}>
                <div className={"teams-wrapper"}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <div className={"teams-title"}>
                                <h3><p>{lang.teams}</p></h3>
                            </div>
                        </Grid>
                        { !showLoader ?
                            <Grid item xs={12}>
                                <div className={"teams-content"}>
                                    <TeamsList lang={lang} teams={teams}/>
                                </div>
                            </Grid>
                            :
                            <Grid item xs={12} className={"loader-container"}>
                                <Paper className={`${classes.paper}`}>
                                    { emptyData ?
                                        <div className={"teams-empty-result"}>
                                           <DeleteOutline/> {lang.empty_result}
                                        </div>:
                                        <div className={"loader-body"}>
                                            <Loader type="Bars" color="grey" height={100} width={100}/>
                                            <span>{lang.loading_data}</span>
                                        </div>
                                    }
                                </Paper>
                            </Grid>
                        }
                    </Grid>
                </div>
            </div>
        </div>
    )
}

export default Layout(Teams)