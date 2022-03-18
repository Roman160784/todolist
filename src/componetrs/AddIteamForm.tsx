import Button from '@material-ui/core/Button/Button';
import IconButton from '@material-ui/core/IconButton/IconButton';
import TextField from '@material-ui/core/TextField/TextField';
import { AddCircleOutline } from '@material-ui/icons';
import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import s from './AddIteamForm.module.css'

type AddIteamFormPropsType = {
    title: string
    addIteam: (title: string) => void
}

export const AddIteamForm = (props: AddIteamFormPropsType) => {

    const [title, setTitle] = useState<string>(props.title)
    const [error, setError] = useState<null | string>(null)



    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }


    const addTitleHandler = () => {
        if (title.trim() !== "") {
            props.addIteam(title)
            setTitle('')
        }
        else {
            setError('Incorrect Value')
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            addTitleHandler()
        }
    }

    return (
        <div>
            <TextField value={title} id="filled-basic" label="some text" variant="filled" size={'small'} 
            onKeyPress={onKeyPressHandler} onChange={onChangeHandler} error={!!error} helperText={error}/>
            {/* <input type="text" value={title} onKeyPress={onKeyPressHandler} onChange={onChangeHandler}/> */}
            <IconButton  onClick={addTitleHandler}  color={'primary'} size={'small'}>
                <AddCircleOutline/>
            </IconButton>
            {/* {error && <div className={error? s.error : ""}>{error}</div>} */}
        </div>
    )

}