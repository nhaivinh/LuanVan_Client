import { LOAD_PRODUCTS, SET_INFO_ACCOUNT } from './StoreConst';

export const loadProduct = payload => ({
    type: LOAD_PRODUCTS,
    payload 
}) 

export const setInfoAccount = payload => ({
    type: SET_INFO_ACCOUNT,
    payload 
}) 