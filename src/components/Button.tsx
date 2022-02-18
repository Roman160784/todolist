import React from 'react';

type ButtonType = {
    title: string
    class: string
    onclick? : () => void
    disabled: boolean
}


export const Button = (props: ButtonType) => {
return (
    <button className={props.class} onClick={props.onclick} disabled={props.disabled}>{props.title}  </button>
)
}