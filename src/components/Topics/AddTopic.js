import React, {useEffect, useState} from 'react'
import {InputAdornment, TextField, Grid} from '@material-ui/core'
import {AddBoxOutlined, MenuOpenOutlined, ChromeReaderModeOutlined} from '@material-ui/icons'
import {useToasts} from 'react-toast-notifications'
import {Animated} from 'react-animated-css'

function AddTopic(props) {
    const {addToast} = useToasts()
    const [topic, setTopic] = useState("")
    const {lang, resetValue, closeAddTopic, addNewTopic} = props

    useEffect(function () {
        setTopic("")
    },[resetValue])

    const handleChange = (ev) => {
        const value = ev.target.value
        setTopic(value)
    }

    const handleAdd = () => {
        if(topic !== ""){
            addNewTopic(topic)
        }else {
            addToast(lang.error_add_empty_topic, {
                appearance: 'error', autoDismiss: true
            })
        }
    }

    return (
        <div className={"add-topic-segment"}>
            <Animated animationIn="flipInX" animationOut="zoomOutDown" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
                <div className="add-topic-main-content" role="document">
                    <div className="add-content">
                        <div className="add-header">
                            <Grid container spacing={3}>
                                <Grid item xs={9}>
                                    <h4 className="title">
                                        <span><ChromeReaderModeOutlined /> {lang.new_topic}</span>
                                    </h4>
                                </Grid>
                                <Grid item xs={3} className={"close-btn-section"}>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                            onClick={()=>closeAddTopic()}>
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="add-body">
                            <TextField
                                fullWidth
                                className={"add-topic-input"}
                                label={lang.add_topic}
                                value={topic}
                                onChange={(ev)=>handleChange(ev)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <MenuOpenOutlined />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <div className="add-button-content">
                                <button type={"button"} onClick={()=>handleAdd()}>
                                    {lang.add}
                                    <AddBoxOutlined />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Animated>
        </div>
    )
}

export default AddTopic