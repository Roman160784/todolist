import Button from '@material-ui/core/Button/Button';
import IconButton from '@material-ui/core/IconButton/IconButton';
import TextField from '@material-ui/core/TextField/TextField';
import { AddCircleOutline } from '@material-ui/icons';
import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootReducerType } from '../redux/store';
import { RequestStatusType } from '../redux/todolist-reducer';
import s from './AddIteamForm.module.css'

type AddIteamFormPropsType = {
    title: string
    addIteam: (title: string) => void
}

export const AddIteamForm = (props: AddIteamFormPropsType) => {

    const status = useSelector<RootReducerType, RequestStatusType>(state => state.app.entityStatus)

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
            onKeyPress={onKeyPressHandler} onChange={onChangeHandler} error={!!error} helperText={error} disabled={status === 'loading'}/>
          
            <IconButton  onClick={addTitleHandler}  color={'primary'} size={'small'} disabled={status === 'loading'}>
                <AddCircleOutline/>
            </IconButton>
            {/* {error && <div className={error? s.error : ""}>{error}</div>} */}
        </div>
    )

}