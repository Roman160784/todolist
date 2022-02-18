import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Button } from './Button';


type AddIteamFormType = {
disabled: boolean
addIteam : (title: string) => void
}

export const AddIteamForm = (props: AddIteamFormType) => {
    
    const [title, setTitle] = useState("")
    const [error, setError] = useState<null | string>(null)

    
 const addIteam = () => {
     if(title.trim() !== ""){
        props.addIteam(title)
        setTitle('')
     }else {
        setError("Incorrect value")  
     }  
}

const onEnterHandker = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if(e.key === "Enter") {
        addIteam()
    }
}

 const onCangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        <div>
        <input className={error ? "error2" : ""} value={title} type="text" onChange={onCangeHandler} onKeyPress={onEnterHandker}/>
        <button onClick={addIteam} disabled={props.disabled}>+</button>
        { error&& <div className="error1">{error}</div>}
        </div>
    )
}