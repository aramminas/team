import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {Grid} from '@material-ui/core'
import {Animated} from 'react-animated-css'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}))

function TeamsList(props) {
    const classes = useStyles()
    const {lang, teams} = props

    return (
        <div className={"teams-presentation-section"}>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={5}>
                        <Animated animationIn="fadeInLeft" animationOut="fadeOutLeft" animationInDuration={2500} animationOutDuration={1000} isVisible={true}>
                            <div className={"team-members-tree"}>
                                <div className={"teams-list-title"}>{lang.teams_list}</div>
                                <ul className={"tree"}>
                                    { teams.map(item => (
                                        <li className="team-members-container" key={item.id}><p>{item.name}</p>
                                            <ul>
                                                <li><p>{item.topic}</p></li>
                                                <li><p>{item.project}</p></li>
                                                { item.members.length > 0 ?
                                                    <li className="team-members-container"><p>{lang.members}</p>
                                                        {item.members.map((member, index) => (
                                                            <ul key={index} className={"member-ul"}>
                                                                <li>
                                                                    <div className={"team-member"}>
                                                                        <figure>
                                                                            <img src={member.avatarUrl} alt="Portfolio Item" />
                                                                            <figcaption>
                                                                                <h3>{member.firstName}</h3>
                                                                                <p className={"member-last-name"}>{member.lastName}</p>
                                                                            </figcaption>
                                                                        </figure>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        ))}
                                                    </li>
                                                    : <li className="team-members-container"><p>{lang.no_participants}</p>
                                                        <ul>
                                                            <li className="empty"><p>{lang.list_is_empty}</p></li>
                                                        </ul>
                                                    </li>
                                                }
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Animated>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default TeamsList
