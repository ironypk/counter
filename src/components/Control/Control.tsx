import React from 'react';
import {Button} from '../Button/Button';

export type ControlPropsType = {
    inc?: () => void
    reset?: () => void
    set?: () => void
    count?: number
    maxValue?: number
    minValue?: number
    error?: boolean
    edit?: boolean
    type: 'get' | 'set'
}

export const Control: React.FC<ControlPropsType> =
    ({
         type, edit,
         error, inc, reset,
         set, count, maxValue,
         minValue}) =>
{

    return (
        <div className={'control'}>
            {
                type === 'get' ?
                    <React.Fragment>
                        <Button callback={inc}
                                disabled={count && maxValue && count >= maxValue || edit || error}>inc</Button>
                        <Button callback={reset} disabled={count === minValue || edit || error}>reset</Button>
                    </React.Fragment>
                    :
                    <Button callback={set} disabled={error || !edit}>set</Button>
            }
        </div>
    )
}