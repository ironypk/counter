import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import {Counter} from './components/Counter/Counter';
import {Control} from './components/Control/Control';
import {Input} from './components/Input/Input';

const COUNT = 'COUNT'

function setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
}

function getLocalStorage(key: string) {
    const value = localStorage.getItem(key)
    if (value) {
        return JSON.parse(value)
    }
}

export type SettingsPropsType = {
    maxValue: number
    minValue: number
}

function App() {
    const [count, setCount] = useState(0)
    const [maxValue, setMaxValue] = useState(5)
    const [minValue, setMinValue] = useState(0)

    const [edit, setEdit] = useState(false)
    const [maxValueErrorMessage, setMaxValueErrorMessage] = useState('')
    const [minValueErrorMessage, setMinValueErrorMessage] = useState('')
    const [error, setError] = useState(false)

    function inc() {
        count < maxValue && setCount(prev => prev + 1)
    }

    function reset() {
        setCount(minValue)
    }

    function set() {
        setLocalStorage(COUNT, {maxValue, minValue})
        setCount(minValue)
        setEdit(false)
    }

    function maxValueChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setEdit(true)
        setMaxValue(+e.currentTarget.value)
        if (+e.currentTarget.value <= minValue) {
            setMaxValueErrorMessage('max value must be > min value')
            setMinValueErrorMessage('min value must be < max value')
            setError(true)
        }
        if (+e.currentTarget.value > minValue) {
            setMaxValueErrorMessage('')
            setMinValueErrorMessage('')
            setError(false)
        }
        if (minValue < 0) {
            setMinValueErrorMessage('min value must be >= 0')
            setError(true)
        }
        if (+e.currentTarget.value <= 0) {
            setMaxValueErrorMessage('max value must be > 0')
            setError(true)
        }
    }

    function minValueChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setEdit(true)
        setMinValue(+e.currentTarget.value)
        if (+e.currentTarget.value >= maxValue) {
            setMinValueErrorMessage('min value must be < max value')
            setMaxValueErrorMessage('max value must be > min value')
            setError(true)
        }
        if (+e.currentTarget.value < maxValue) {
            setMaxValueErrorMessage('')
            setMinValueErrorMessage('')
            setError(false)
        }
        if (maxValue <= 0) {
            setMaxValueErrorMessage('max value must be >= 0')
            setError(true)
        }
        if (+e.currentTarget.value < 0) {
            setMinValueErrorMessage('min value must be >= 0')
            setError(true)
        }
    }

    useEffect(() => {
        const value = getLocalStorage(COUNT)
        value && setMaxValue(value.maxValue)
        value && setMinValue(value.minValue)
    }, [])

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



