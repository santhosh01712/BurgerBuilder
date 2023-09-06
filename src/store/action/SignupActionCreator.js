import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const singupSuccess = (username, email, name, phone, street, zipcode, country) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        username: username,
        mailid: email,
        name: name,
        phone: phone,
        street: street,
        zipcode: zipcode,
        country: country
    };
};

export const singupFailed = (error) => {
    return {
        type: actionTypes.SIGNUP_FAILED,
        error: error
    };
};

export const singupStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    };
};
export const signout = () => {
    return {
        type: actionTypes.SIGN_OUT
    };
};
export const signup = (email, password, name, phone, street, zipcode, country) => {
    return dispatch => {
        dispatch(singupStart());
        const singupData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAM28AAOp9Ey_BAJ89gDT3zKsLm89xskMI';
        axios.post(url, singupData)
            .then(res => {
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem("token", res.data.idToken);
                localStorage.setItem("exirationDate", expirationDate);
                localStorage.setItem("userId", res.data.localId);
                const username = res.data.localId;

                const signupUserDetail = {
                    username, email, name, phone, street, zipcode, country
                }
                axios.post('https://react-my-burger-d0e0e-default-rtdb.firebaseio.com/BurgerUser/' + username + '.json', signupUserDetail)
                    .then(resolve => {
                        dispatch(singupSuccess(username, email, name, phone, street, zipcode, country));
                    })
                    .catch(error => {
                        console.log(error.response.data.error);
                        dispatch(singupFailed(error.response.data.error));
                    });
            })
            .catch(err => {
                console.log(err.response.data.error);
                dispatch(singupFailed(err.response.data.error));
            })
    };
};

