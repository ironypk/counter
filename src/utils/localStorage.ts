export function setLocalStorage<T>(key: string, state: T) {
    localStorage.setItem(key, JSON.stringify(state))
}
export function getLocalStorage(key: string) {
    try{
        const serializedState = localStorage.getItem(key)
        if(serializedState === null){
            return undefined
        }
        return JSON.parse(serializedState)
    }
    catch (e) {
        return undefined
    }

}