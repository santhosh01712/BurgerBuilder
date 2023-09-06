import * as actionTypes from '../action/actionsTypes';

const initialState = {
    incredient: null,
    totalPrice: 40,
    error: false,
    building: false
}
const INCREDIENT_PRICES = {
    cheese: 10,
    bacon: 20,
    meat: 30,
    salad: 8
}
const setTotalPrice = (incredient) => {
    let totalPrice = 0;
    for (let key in incredient) {
        totalPrice += INCREDIENT_PRICES[key] * incredient[key]
    }
    return totalPrice
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INCREDIENT:
            return {
                ...state,
                incredient: {
                    ...state.incredient,
                    [action.incredientName]: state.incredient[action.incredientName] + 1
                },
                totalPrice: state.totalPrice + INCREDIENT_PRICES[action.incredientName],
                building: true
            };
        case actionTypes.REMOVE_INCREDIENT:
            return {
                ...state,
                incredient: {
                    ...state.incredient,
                    [action.incredientName]: state.incredient[action.incredientName] - 1
                },
                totalPrice: state.totalPrice - INCREDIENT_PRICES[action.incredientName],
                building: true
            };
        case actionTypes.INIT_INCREDIENT:
            return {
                ...state,
                incredient: {
                    ...action.incredient
                },
                totalPrice: 40 + setTotalPrice(action.incredient),
                error: false,
                building: false
            };
        case actionTypes.FETCH_INCREDIENT_FAILED:
            return {
                ...state,
                incredient: {
                    ...state.incredient
                },
                error: true
            }
        default:
            return state
    }
}

export default reducer