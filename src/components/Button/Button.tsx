import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import s from './Button.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>


type ButtonPropsType = {
    callback?:()=>void
}


export const Button: React.FC<DefaultButtonPropsType & ButtonPropsType>
    = ({callback,...restProps}) =>
    <button className={s.button} onClick={callback} {...restProps}/>