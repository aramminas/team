import React, {useState, useEffect} from 'react'
import {set_teams_data} from "../../store/actions/teamsAction";
import {connect, useSelector} from "react-redux";
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
    const {teams: teamsData} = useSelector(state => state)
    const [teams, setTeams] = useState([])
    const [emptyData, setEmptyData] = useState(false)
    const [showLoader, setShowLoader] = useState(true)
    const {lang} = props

    useEffect(function () {
        if(teamsData.length > 0 ){
            setTeams([...teamsData])
            setShowLoader(false)
        }else{
            getTeams()
        }
    }, [])

    const getTeams = () => {
        const token = localStorage.getItem("userToken")
        if(token){
            API.getTeams(token).then(res => {
                if(res && res.length > 0){
                    setTeams(res)
                    setShowLoader(false)
                    props.setTeamsData([...res])
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

const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTeamsData: (data) => {dispatch(set_teams_data(data))},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Layout(Teams))