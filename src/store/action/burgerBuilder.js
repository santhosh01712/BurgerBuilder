import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

export const addIncredient = (name) => {
    return {
        type: actionTypes.ADD_INCREDIENT,
        incredientName: name
    };
};

export const removeIncredient = (name) => {
    return {
        type: actionTypes.REMOVE_INCREDIENT,
        incredientName: name
    };
};

export const setIncredient = (incredientReceived) => {
    return {
        type: actionTypes.INIT_INCREDIENT,
        incredient: incredientReceived
    }
}
export const fetchIncredientFailed = () => {
    return {
        type: actionTypes.FETCH_INCREDIENT_FAILED
    }
}

export const initIncredient = () => {
    return dispatch => {
        axios.get('https://react-my-burger-d0e0e-default-rtdb.firebaseio.com/incredients.json')
            .then(response => {
                dispatch(setIncredient(response.data));
            }).catch(e => {
                dispatch(fetchIncredientFailed());
            });

    }
}