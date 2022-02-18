import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ErrorType } from '../../redux/app/app-reducer';
import { rootReducerTypes } from '../../redux/store';
import style from './snackBar.module.css'

export const SnackBar = () => {

    const error = useSelector<rootReducerTypes, ErrorType>(state => state.app.error)
    
    const [open, setOpen] = useState(true);

    return (
        <div className={style.center}>
            some error 
        </div>
    )

}