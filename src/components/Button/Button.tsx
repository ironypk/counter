import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import s from './Button.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>


export const Button: React.FC<DefaultButtonPropsType>
    = (props) =>
    <button className={s.button} {...props}/>