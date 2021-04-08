import React from 'react';
import s from './Counter.module.css';

export type CounterPropsType = {
    count: number
    maxValue: number
    error: boolean
    edit: boolean
}

export const Counter: React.FC<CounterPropsType> = ({edit, error, count, maxValue}) => {
    const classes = [
        'counter',
        count >= maxValue && s.active,
        error ? s.error : ''
    ]
    const getTitle = () => {
        if (error) {
            return <div>Incorrect value!</div>
        } else if (edit) {
            return <div>end values and press "set"</div>
        }
        return <div>{count}</div>
    }
    return (
        <div className={classes.join(' ')}>
            {getTitle()}
        </div>
    )
}