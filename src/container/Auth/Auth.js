import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import './Auth.css';
import * as actionCreators from '../../store/action/actionsDefault';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';


class Auth extends Component {

    state = {
        signupLinkClicked: false,
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: "Mail Address",
                    onChange: (event) => this.inputChangeHandler(event, 'email')
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: "Password",
                    onChange: (event) => this.inputChangeHandler(event, 'password')
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            }
        }
    }
    inputChangeHandler = (event, id) => {
        let orderFormCopy = { ...this.state.controls };
        let selectedInput = { ...orderFormCopy[id] };
        selectedInput.value = event.target.value;
        selectedInput.valid = this.checkValidity(selectedInput.value, selectedInput.validation);
        selectedInput.touched = true;
        orderFormCopy[id] = selectedInput;
        let formValid = true;
        for (let inputIdentifier in orderFormCopy) {
            if (orderFormCopy[inputIdentifier].elementType !== 'select') {
                formValid = orderFormCopy[inputIdentifier].valid && formValid;
            }
        }
        this.setState({ controls: orderFormCopy, formIsValid: formValid });
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        return isValid;
    }
    submitHander = (event) => {
        event.preventDefault();
        this.props.onAuthenticate(this.state.controls.email.value, this.state.controls.password.value, this.state.signinClicked);
    }
    componentDidMount() {
        if (!this.props.building && this.props.redirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }
    render() {
        const formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = formElementArray.map(formElement =>
            <Input key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invlid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
            />
        )
        if (this.props.loading) {
            form = <Spinner />
        }
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p style={{ color: 'red', fontWeight: "bold" }}>{this.props.error.message.split("_").join(" ")}</p>
            )
        }
        let authRedicrct = null;
        if (this.props.isAuthenticated) {
            authRedicrct = <Redirect key={this.props.redirectPath} to={this.props.redirectPath} />
        }
        if (this.state.signupLinkClicked) {
            authRedicrct = <Redirect key="SignupLink" to="signup" />
        }
        if (this.props.error && this.props.error.message === "EMAIL_NOT_FOUND") {
            errorMessage =
                <p style={{ color: 'red', fontWeight: "bold" }}>{this.props.error.message.split("_").join(" ")}, SIGNUP to continue!</p>

        }
        return (
            <div className="Auth jumbotron">
                {authRedicrct}
                <form onSubmit={this.submitHander}>
                    {form}
                    {errorMessage}
                    <button className="btn btn-success m-2" type="submit">Signin</button>
                </form>
                <button className={'btn btn-md btn-primary ml-2'}
                    onClick={() => this.setState({ signupLinkClicked: true })}>
                    Signup Here </button>

            </div>

        );

    }
}
const mapStateToProps = state => {
    return {
        token: state.auth.tocken,
        userId: state.auth.userId,
        error: state.auth.error,
        loading: state.auth.loading,
        isAuthenticated: state.auth.token !== null,
        building: state.burgerBuilder.building,
        redirectPath: state.auth.authRedirect
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuthenticate: (email, password) => dispatch(actionCreators.authenticate(email, password)),
        onSetAuthRedirectPath: () => dispatch(actionCreators.setAuthRedirectPath('/'))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);