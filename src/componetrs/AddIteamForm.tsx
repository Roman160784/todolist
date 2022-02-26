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
            <input type="text" value={title} onKeyPress={onKeyPressHandler} onChange={onChangeHandler}/>
            <button onClick={addTitleHandler}>ADD</button>
            {error && <div className={error? s.error : ""}>{error}</div>}
        </div>
    )

}