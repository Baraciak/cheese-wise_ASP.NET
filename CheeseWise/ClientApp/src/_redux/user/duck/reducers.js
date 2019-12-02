
import types from './types'
const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state=INITIAL_STATE, action) =>{
    switch(action.type){
        case types.ADD_USER:
            //...state - copy state to prevent deleting other properties
            return {...state, currentUser: action.item}
        case types.RESET_USER:
                return {...state, currentUser: null}
        default:
            return state;
    }
}

export default userReducer;
