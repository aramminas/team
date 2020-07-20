import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core'
import {Ballot, ThumbUpAltTwoTone} from '@material-ui/icons'

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    table: {
        minWidth: 650,
    },
}))

function ProjectsList(props) {
    const classes = useStyles()
    const {lang, projects: rows , vote} = props

    return (
        <div className={"projects-list-content"}>
            <div className={`${classes.root} projects-content`}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <div className={'projects-list-title'}>
                            <h3><Ballot />{lang.all_projects}</h3>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer component={Paper} className={"projects-list-table"}>
                            <Table className={classes.table} aria-label="projects table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{lang.title}</TableCell>
                                        <TableCell align="left">{lang.description}</TableCell>
                                        <TableCell align="center">{lang.voting_count}</TableCell>
                                        <TableCell align="right">{lang.status_vote}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell component="th" scope="row">
                                                {row.title}
                                            </TableCell>
                                            <TableCell align="left">{row.description}</TableCell>
                                            <TableCell align="center">{row.votingsCount}</TableCell>
                                            <TableCell align="center" className={"vote-project"}>
                                                {row.votedByMe ?
                                                    <ThumbUpAltTwoTone htmlColor={"#0057ff"} onClick={()=>vote(row.id, "unlike")}/> :
                                                    <ThumbUpAltTwoTone htmlColor={"grey"} onClick={()=>vote(row.id, "like")}/>}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default ProjectsList