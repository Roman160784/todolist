import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { RootReducerType } from '../redux/store';

import { useDispatch, useSelector } from 'react-redux';
import { appErrorAC, errorType } from '../redux/app-reducer';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
   props, ref) {
   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {

    const error = useSelector<RootReducerType, errorType>(state => state.app.error)
    const dispatch = useDispatch() 
    
   const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
       if (reason === 'clickaway') {
           return;
       }
       dispatch(appErrorAC(null))
   };

   return (
       <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
           <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}😠
           </Alert>
       </Snackbar>
   );
}
