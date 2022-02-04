import React from 'react';

type ButtonType = {
    title: string
    class: string
    onclick : () => void
}


export const Button = (props: ButtonType) => {
return (
    <button className={props.class} onClick={props.onclick}>{props.title}</button>
)
}