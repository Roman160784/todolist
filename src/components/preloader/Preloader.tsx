import React from 'react'
import s from './preloader.module.css'

export const Preloader = () => {
    return (
    <div className={s.center}>
  <div className={s.wave}></div>
  <div className={s.wave}></div>
  <div className={s.wave}></div>
  <div className={s.wave}></div>
  <div className={s.wave}></div>
  <div className={s.wave}></div>
  <div className={s.wave}></div>
  <div className={s.wave}></div>
  <div className={s.wave}></div>
  <div className={s.wave}></div>
</div>
    )
}