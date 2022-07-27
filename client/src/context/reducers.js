export const LoginReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN_START' :
            return {
                user : null,
                isFetching : true,
                error : false
            }
        case 'LOGIN_SUCCESS' :
            return {
                user : action.payload,
                isFetching : false,
                error : false
            }
        case 'LOGIN_FAILURE' :
            return {
                user : null,
                isFetching : false,
                error : true
            }
        default : 
            return state
    }
}

export const DocumentReducer = (state, action) => {
    if (action.type === 'ADD_NAME'){
        return {
            ...state,
            name: action.payload,
        }
    }
    else if(action.type === 'SET_USER_INTERACTION'){
        return {
            ...state,
            canEdit : action.payload,
        }
    }
    else{
        return state
    }
}