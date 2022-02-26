import React, { ChangeEvent, useState } from 'react';

type EditableSpanPropsType = {
title: string
changeTitle: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

 const [title, setTitle] = useState(props.title)
 const [mode, setEditMode] = useState <boolean>(false)

 const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)   
}

const onBlurHandler = () => {
    props.changeTitle(title)
    setEditMode(false)
}

const onDoubleClickHandler = () => {
    setEditMode(true)
}

    return mode
            ?<input type="text" value={title} onChange={onChangeHandler} onBlur={onBlurHandler} autoFocus/>
            : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
        
}