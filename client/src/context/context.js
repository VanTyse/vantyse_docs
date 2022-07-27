import { createContext, useReducer } from "react"
import {LoginReducer, DocumentReducer} from "./reducers"

const LOGIN_INITIAL_STATE = {
    user : JSON.parse(localStorage.getItem('user')) || null,
    isFetching : false,
    error : false,
}

export const UserContext = createContext()

export const UserContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(LoginReducer, LOGIN_INITIAL_STATE)

    return <UserContext.Provider value={{...state, dispatch}}>
        {children}
    </UserContext.Provider>
}

const DOCUMENT_INITIAL_STATE = {
    name: null,
    canEdit : false
}

export const DocumentContext = createContext();

export const DocumentContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(DocumentReducer, DOCUMENT_INITIAL_STATE)
    return <DocumentContext.Provider value={{...state, dispatch}}>
        {children}
    </DocumentContext.Provider>
}