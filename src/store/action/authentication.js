import * as actionTypes from './actionsTypes';
import axios from 'axios';
import { singupSuccess, signout } from './SignupActionCreator';


export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    };
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("exirationDate");
    localStorage.removeItem("userId");
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
            dispatch(signout());
        }, expirationTime * 1000);
    }
}
export const authenticate = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAM28AAOp9Ey_BAJ89gDT3zKsLm89xskMI';
        axios.post(url, authData)
            .then(res => {
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem("token", res.data.idToken);
                localStorage.setItem("exirationDate", expirationDate);
                localStorage.setItem("userId", res.data.localId);
                axios.get('https://react-my-burger-d0e0e-default-rtdb.firebaseio.com/BurgerUser/' + res.data.localId + '.json?auth=' + res.data.idToken)
                    .then(response => {
                        let userData = {}
                        for (let key in response.data) {
                            let copydata = response.data[key]
                            for (let keyinside in copydata) {
                                userData[keyinside] = copydata[keyinside];
                            }
                        }
                        dispatch(singupSuccess(userData['username'], userData['email'], userData['name'], userData['phone'], userData['street'], userData['zipcode'], userData['country']))
                        dispatch(authSuccess(res.data.idToken, res.data.localId))
                        dispatch(checkAuthTimeout(res.data.expiresIn))
                    }).catch(e => {
                        console.log(e)
                    });

            })
            .catch(err => {
                dispatch(authFailed(err.response.data.error));
            })
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}


export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
            dispatch(signout());
        } else {
            const expirationTime = new Date(localStorage.getItem("exirationDate"));
            const userId = localStorage.getItem("userId");
            if (expirationTime > new Date()) {
                axios.get('https://react-my-burger-d0e0e-default-rtdb.firebaseio.com/BurgerUser/' + userId + '.json?auth=' + token)
                    .then(response => {
                        let userData = {}
                        for (let key in response.data) {
                            let copydata = response.data[key]
                            for (let keyinside in copydata) {
                                userData[keyinside] = copydata[keyinside];
                            }
                        }
                        dispatch(singupSuccess(userData['username'], userData['email'], userData['name'], userData['phone'], userData['street'], userData['zipcode'], userData['country']))
                        dispatch(authSuccess(token, userId))
                        dispatch(checkAuthTimeout((expirationTime.getTime() - new Date().getTime()) / 1000))
                    }).catch(e => {
                        console.log(e)
                    });

            } else {
                dispatch(logout());
                dispatch(signout());
            }

        }
    }
}