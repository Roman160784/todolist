import React from 'react';

export type ButtonPropsType = {
    title: string
    class: string
    onClick: () => void
}


export const Button = (props: ButtonPropsType) => {
    return (
        <button onClick={props.onClick}
            className={props.class}>
            {props.title}</button>
    )
}