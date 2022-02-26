import React, { useState } from 'react';

type AddIteamFormPropsType = {
    title: string
    addIteam: (title: string) => void
}

export const AddIteamForm = (props: AddIteamFormPropsType) => {

    const [title, setTitle] = useState <string> (props.title)



    return (
        <input type="text" />
    )



}