import types from './types';


const add = item => ({ type: types.ADD_USER, item });  
const reset = () => ({ type: types.RESET_USER });  
const addCompanyBool = bool => ({ type: types.ADD_COMPANY_BOOL, bool })

export default{
    add,
    reset,
    addCompanyBool
}