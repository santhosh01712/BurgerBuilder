import * as actionsTypes from '../action/actionsTypes';
const initialState = {
    mailid: "",
    username: null,
    name: "",
    phone: "",
    street: "",
    zipcode: "",
    country: "",
    error: null,
    loading: false,
    userWasSet: false
};

const signupReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.SIGNUP_START:
            return {
                ...state,
                loading: true,
                userWasSet: false,
                error: null
            };
        case actionsTypes.SIGNUP_FAILED:
            return {
                ...state,
                userWasSet: false,
                error: action.error,
                loading: false
            };
        case actionsTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                userWasSet: true,
                loading: false,
                username: action.username,
                mailid: action.mailid,
                name: action.name,
                phone: action.phone,
                street: action.street,
                zipcode: action.zipcode,
                country: action.country,

            }
        case actionsTypes.SIGN_OUT:
            return {
                initialState
            }
        default:
            return state;
    }
};


export default signupReducer;