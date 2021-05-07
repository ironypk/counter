import {Events} from './events';

export const initialState = {
    count: 0,
    minValue: 0,
    maxValue: 5,
    edit: false,
    error: false,
    maxValueErrorMessage: '',
    minValueErrorMessage: ''
}

export type CountStateType = typeof initialState

export type CountActionsType = ReturnType<typeof incAC>
    | ReturnType<typeof resetAC>
    | ReturnType<typeof setCountAC>
    | ReturnType<typeof setMaxValueAC>
    | ReturnType<typeof setMinValueAC>
    | ReturnType<typeof setEditAC>



// export type handlersType = {
//     [key in Events | 'DEFAULT']: (state: CountStateType, action: any) => CountStateType
// }
//
//
// const handlers: handlersType = {
//     [Events.INC]: (state) => {
//         return {
//             ...state, count: state.count + 1
//         }
//     },
//     [Events.RESET]: (state) => {
//         return {
//             ...state, count: state.minValue
//         }
//     },
//     [Events.SET_COUNT]: (state, action) => {
//         return {
//             ...state, count: action.value
//         }
//     },
//     [Events.SET_EDIT]: (state, action) => {
//         return {
//             ...state, edit: action.predicate
//         }
//     },
//     [Events.SET_MAX_VALUE]: (state, {value}) => {
//         if (value <= state.minValue) {
//             return {
//                 ...state,
//                 edit: true,
//                 maxValue: value,
//                 maxValueErrorMessage: 'max value must be > min value',
//                 minValueErrorMessage: 'min value must be < max value',
//                 error: true
//             }
//         }
//         if(value > state.minValue){
//             return {
//                 ...state,
//                 edit: true,
//                 maxValue: value,
//                 maxValueErrorMessage: '',
//                 minValueErrorMessage: '',
//                 error: false
//             }
//         }
//         if(state.minValue < 0){
//             return {
//                 ...state,
//                 edit: true,
//                 maxValue: value,
//                 minValueErrorMessage: 'min value must be >= 0',
//                 error: true
//             }
//         }
//         if(value <= 0){
//             return {
//                 ...state,
//                 edit: true,
//                 maxValue: value,
//                 maxValueErrorMessage: 'max value must be > 0',
//                 error: true
//             }
//         }
//         return {
//             ...state, maxValue: value, edit: true
//         }
//     },
//     [Events.SET_MIN_VALUE]: (state, {value}) => {
//         if(value >= state.maxValue){
//             return {
//                 ...state,
//                 edit: true,
//                 minValue: value,
//                 maxValueErrorMessage: 'max value must be > min value',
//                 minValueErrorMessage: 'min value must be < max value',
//                 error: true
//             }
//         }
//         if(value < state.maxValue){
//             return {
//                 ...state,
//                 edit: true,
//                 minValue: value,
//                 maxValueErrorMessage: '',
//                 minValueErrorMessage: '',
//                 error: false
//             }
//         }
//         if(state.maxValue <= 0){
//             return {
//                     ...state,
//                     edit: true,
//                     minValue: value,
//                     maxValueErrorMessage: 'max value must be >= 0',
//                     error: true
//             }
//         }
//         if(value < 0){
//             return {
//                 ...state,
//                 edit: true,
//                 minValue: value,
//                 minValueErrorMessage: 'min value must be >= 0',
//                 error: true
//             }
//         }
//         return {
//             ...state, minValue: value
//         }
//     },
//     'DEFAULT': (state) => state
// }

export const countReducer = (state: CountStateType = initialState, action: CountActionsType): CountStateType => {
    switch (action.type) {
        case Events.SET_MIN_VALUE:
            if(action.value >= state.maxValue){
            return {
                ...state,
                edit: true,
                minValue: action.value,
                maxValueErrorMessage: 'max value must be > min value',
                minValueErrorMessage: 'min value must be < max value',
                error: true
            }
        }
        if(action.value < state.maxValue){
            return {
                ...state,
                edit: true,
                minValue: action.value,
                maxValueErrorMessage: '',
                minValueErrorMessage: '',
                error: false
            }
        }
        if(state.maxValue <= 0){
            return {
                    ...state,
                    edit: true,
                    minValue: action.value,
                    maxValueErrorMessage: 'max value must be >= 0',
                    error: true
            }
        }
        if(action.value < 0){
            return {
                ...state,
                edit: true,
                minValue: action.value,
                minValueErrorMessage: 'min value must be >= 0',
                error: true
            }
        }
        return {
            ...state, minValue: action.value
        }
        case Events.SET_MAX_VALUE:
            if (action.value <= state.minValue) {
                return {
                    ...state,
                    edit: true,
                    maxValue: action.value,
                    maxValueErrorMessage: 'max value must be > min value',
                    minValueErrorMessage: 'min value must be < max value',
                    error: true
                }
            }
            if(action.value > state.minValue){
                return {
                    ...state,
                    edit: true,
                    maxValue: action.value,
                    maxValueErrorMessage: '',
                    minValueErrorMessage: '',
                    error: false
                }
            }
            if(state.minValue < 0){
                return {
                    ...state,
                    edit: true,
                    maxValue: action.value,
                    minValueErrorMessage: 'min value must be >= 0',
                    error: true
                }
            }
            if(action.value <= 0){
                return {
                    ...state,
                    edit: true,
                    maxValue: action.value,
                    maxValueErrorMessage: 'max value must be > 0',
                    error: true
                }
            }
            return {
                ...state, maxValue: action.value, edit: true
            }
        case Events.SET_COUNT:
            return {
                ...state, count: action.count
            }
        case Events.RESET:
            return {
                ...state, count: state.minValue
            }
        case Events.INC:
            return {
                ...state, count: state.count + 1
            }
        case Events.SET_EDIT:
            return {
                ...state, edit: action.predicate
            }
        default:
            return state
    }
}

export const incAC = () => {
    return {
        type: Events.INC
    } as const
}
export const resetAC = () => {
    return {
        type: Events.RESET
    } as const
}
export const setCountAC = (count: number) => {
    return {
        type: Events.SET_COUNT,
        count
    } as const
}
export const setMaxValueAC = (value: number) => {
    return {
        type: Events.SET_MAX_VALUE,
        value
    } as const
}
export const setMinValueAC = (value: number) => {
    return {
        type: Events.SET_MIN_VALUE,
        value
    } as const
}
export const setEditAC = (predicate: boolean) => {
    return {
        type: Events.SET_EDIT,
        predicate:predicate
    } as const
}

// export type SetLocalStorageTCType = () => (dispatch: Dispatch, getState: () => AppStateType) => void
// export type GetLocalStorageTCType = () => (dispatch: Dispatch) => void


// export const setLocalStorageTC:SetLocalStorageTCType = () => (dispatch, getState) => {
//     const maxValue = getState().count.maxValue
//     const minValue = getState().count.minValue
//     setLocalStorage('COUNT', {maxValue, minValue})
//     dispatch(setCountAC(minValue))
//     dispatch(setEditAC(false))
// }
// export const getLocalStorageTC:GetLocalStorageTCType = () => (dispatch) => {
//     const value = getLocalStorage('COUNT', {maxValue: 5, minValue: 0})
//     if (value) {
//         dispatch(setMaxValueAC(value.maxValue))
//         dispatch(setMinValueAC(value.minValue))
//         dispatch(setCountAC(value.minValue))
//         dispatch(setEditAC(false))
//     }
// }



