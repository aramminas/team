import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {Grid} from '@material-ui/core'
import Layout from '../../hoc/layout/Layout'
import './Main.scss'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}))

function Main(props) {
    const classes = useStyles()
    const {lang} = props

    return (
        <div className={"main-container"}>
            <div className={`${classes.root} main-page-content`}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <div className={"main-page-title"}>
                            {lang.site_name}
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Layout(Main)