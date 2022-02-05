import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { isPropertySignature } from 'typescript';

type EditableSpanType = {
title : string
changeTitleinSpan: (titleInSpan: string) => void
}


export const EditableSpan = (props: EditableSpanType) => {

const [mode, setMode] = useState<boolean> (false)
const [titleInSpan, setTitleInSpan] = useState("")

const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    setTitleInSpan(e.currentTarget.value)
}

const onBlurHandler = () => {
    setMode(false)
    props.changeTitleinSpan(titleInSpan)
}
const onDoubleClickrHandler = () => {
    setMode(true)
}



    return (
        mode
        ?<input type="text" value={titleInSpan} onChange={onChangeHandler} onBlur={onBlurHandler} autoFocus/>
        :<span onDoubleClick={onDoubleClickrHandler}>{props.title}</span>
    )
}