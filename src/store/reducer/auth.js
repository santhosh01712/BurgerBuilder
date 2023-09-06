import * as actionsTypes from '../action/actionsTypes';


const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirect: '/'
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.AUTH_START:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionsTypes.AUTH_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case actionsTypes.AUTH_SUCCESS:
            return {
                ...state,
                userId: action.userId,
                token: action.token,
                loading: false,
                error: null
            };
        case actionsTypes.AUTH_LOGOUT:
            return {
                ...state,
                userId: null,
                token: null,
                loading: false,
                error: null
            };
        case actionsTypes.SET_AUTH_REDIRECT_PATH:
            return {
                ...state,
                authRedirect: action.path
            }

        default:
            return state;
    }
};


export default authReducer;