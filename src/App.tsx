import React, {ChangeEvent} from 'react';
import './App.css';
import {Counter} from './components/Counter/Counter';
import {Control} from './components/Control/Control';
import {Input} from './components/Input/Input';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch} from 'redux';
import {
    CountStateType,
    incAC,
    resetAC,
    setCountAC,
    setEditAC,
    setMaxValueAC,
    setMinValueAC
} from './redux/countReducer';
import {AppStateType} from './redux/store';

function App() {
    const dispatch = useDispatch<Dispatch<any>>()
    const {
        count,
        maxValue,
        minValue,
        edit,
        maxValueErrorMessage,
        minValueErrorMessage,
        error
    } = useSelector((state: AppStateType): CountStateType => state.count)


    function inc() {
        dispatch(incAC())
    }

    function reset() {
        dispatch(resetAC())
    }

    function set() {
        dispatch(setEditAC(false))
        dispatch(setCountAC(minValue))
    }

    function maxValueChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        dispatch(setMaxValueAC(+e.currentTarget.value))
    }

    function minValueChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        dispatch(setMinValueAC(+e.currentTarget.value))
    }

    return (
        <div className="root">
            <div className="window">
                <CountSetter minValue={minValue} maxValue={maxValue} maxValueChangeHandler={maxValueChangeHandler}
                             maxValueErrorMessage={maxValueErrorMessage} minValueChangeHandler={minValueChangeHandler}
                             minValueErrorMessage={minValueErrorMessage}/>
                <Control edit={edit} type={'set'} set={set} error={error}/>
            </div>
            <div className="window">
                <Counter count={count} edit={edit} maxValue={maxValue}
                         error={!!maxValueErrorMessage || !!minValueErrorMessage}/>
                <Control edit={edit} type={'get'} inc={inc} reset={reset} count={count} maxValue={maxValue}
                         minValue={minValue} error={!!maxValueErrorMessage || !!minValueErrorMessage}/>
            </div>
        </div>
    );
}

export type CountSetterPropsType = {
    maxValue: number
    minValue: number
    maxValueChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
    minValueChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
    maxValueErrorMessage: string
    minValueErrorMessage: string
}

export const CountSetter: React.FC<CountSetterPropsType> = ({maxValue, maxValueChangeHandler, maxValueErrorMessage, minValue, minValueChangeHandler, minValueErrorMessage}) => {
    return (
        <div className="counter">
            <Input
                title='max value:'
                name="max"
                value={maxValue}
                onChange={maxValueChangeHandler}
                errorMessage={maxValueErrorMessage}

            />
            <Input
                title='min value:'
                name="min"
                value={minValue}
                onChange={minValueChangeHandler}
                errorMessage={minValueErrorMessage}
            />
        </div>
    )
}

export default App;



