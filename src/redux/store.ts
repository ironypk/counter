import {applyMiddleware, combineReducers, createStore} from 'redux';
import {countReducer, CountStateType, initialState} from './countReducer';
import thunk from 'redux-thunk';
import {getLocalStorage, setLocalStorage} from '../utils/localStorage';

const rootReducer = combineReducers({
    count:countReducer
})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer,getLocalStorage('COUNT'),applyMiddleware(thunk))


store.subscribe(()=>{
    const edit = store.getState().count.edit
    const state = store.getState()
    if(!edit){
        setLocalStorage<AppStateType>('COUNT', state)
    }
})