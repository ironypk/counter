import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react';
import style from './Input.module.css'
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
export type InputPropsType = {
    title?: string
    errorMessage:string
}
export const Input: React.FC<InputPropsType & DefaultInputPropsType> =
    ({errorMessage, title, ...restProps}) => {
    const inputClasses = [
        style.input,
        errorMessage ? style.error : ''
    ]
    return (
        <div className={style.root}>
            <div className={style.title}>
                {title}
            </div>
            <label className={style.label}>
                {errorMessage && <div className={style.error_message}>{errorMessage}</div>}
                <input className={inputClasses.join(' ')} {...restProps} type="number"/>
            </label>
        </div>
    )
}