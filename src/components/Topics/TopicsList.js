import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {withStyles, makeStyles, useTheme} from '@material-ui/core/styles'
import {
    Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter,
    TablePagination, IconButton
} from '@material-ui/core'
import {
    ThumbUpAltTwoTone, DeleteForeverTwoTone, FirstPage, LastPage,
    KeyboardArrowLeft, KeyboardArrowRight
} from '@material-ui/icons'

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell)

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}))

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    table: {
        minWidth: 700,
    }
}))

function TablePaginationActions(props) {
    const classes = useStyles1()
    const theme = useTheme()
    const { count, page, rowsPerPage, onChangePage } = props

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0)
    }

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1)
    }

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1)
    }

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
    }

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
            </IconButton>
        </div>
    )
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
}

function TopicsList(props) {
    const classes = useStyles()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const {lang, topics: rows, vote, deleteTopic} = props

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    return (
        <Grid item xs={12} className={"topics-list-table"}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="topics table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>{lang.title}</StyledTableCell>
                            <StyledTableCell align="center">{lang.voting_count}</StyledTableCell>
                            <StyledTableCell align="center">{lang.status_vote}</StyledTableCell>
                            <StyledTableCell align="center">{lang.settings}</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                        ).map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell align="center">
                                    {row.votingsCount}
                                </TableCell>
                                <TableCell align="center" className={"vote-delete-topic"}>
                                    {row.votedByMe ?
                                        <ThumbUpAltTwoTone htmlColor={"#0057ff"} onClick={()=>vote(row.id, "unlike")}/> :
                                        <ThumbUpAltTwoTone htmlColor={"grey"} onClick={()=>vote(row.id, "like")}/>}
                                </TableCell>
                                <TableCell align="center" className={"vote-delete-topic"}>
                                    {row.canDelete ?
                                        <DeleteForeverTwoTone htmlColor={"red"} onClick={()=>deleteTopic(row.id)}/>:
                                        <DeleteForeverTwoTone htmlColor={"grey"} className={"forbidden-to-delete"}/>}
                                </TableCell>
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={4}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Grid>
    )
}

export default TopicsList