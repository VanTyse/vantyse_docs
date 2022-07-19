import { createContext, useReducer } from "react"
import LoginReducer from "./reducers"

const INITIAL_STATE = {
    user : JSON.parse(localStorage.getItem('user')) || null,
    isFetching : false,
    error : false,
}

export const Context = createContext()

export const ContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(LoginReducer, INITIAL_STATE)

    return <Context.Provider value={{...state, dispatch}}>
        {children}
    </Context.Provider>
}