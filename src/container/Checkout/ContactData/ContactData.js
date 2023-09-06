import React, { Component } from 'react';
import './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/ErrorHandler/ErrorHandler';
import * as actionCreators from '../../../store/action/actionsDefault';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Your Name",
                    onChange: (event) => this.eventHandler(event, 'name')
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Your Street",
                    onChange: (event) => this.eventHandler(event, 'street')
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "ZIP Code",
                    onChange: (event) => this.eventHandler(event, 'zip')
                },
                value: '',
                validation: {
                    required: true,
                    // minLength: 5,
                    // maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Country",
                    onChange: (event) => this.eventHandler(event, 'country')
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: "Your Mail",
                    onChange: (event) => this.eventHandler(event, 'email')
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ],
                    onChange: (event) => this.eventHandler(event, 'deliveryMethod')
                },
                value: 'fastest',
                touched: false
            }
        },
        loading: false,
        incredient: {},
        formIsValid: false,
        formInit: true
    }
    componentDidMount() {
        if (this.state.formInit) {
            let orderFormCopy = { ...this.state.orderForm };
            for (let formElementIdentifier in orderFormCopy) {
                let processingElement = orderFormCopy[formElementIdentifier];
                switch (formElementIdentifier) {
                    case 'name':
                        processingElement.value = this.props.signup.name;
                        break;
                    case 'street':
                        processingElement.value = this.props.signup.street;
                        break;
                    case 'country':
                        processingElement.value = this.props.signup.country;
                        break;
                    case 'email':
                        processingElement.value = this.props.signup.mailid;
                        break;
                    case 'zip':
                        processingElement.value = this.props.signup.zipcode;
                        break;
                    default:
                        continue
                }
                processingElement.touched = true;
                if (formElementIdentifier !== 'deliveryMethod') {
                    processingElement.valid = this.checkValidity(processingElement.value, processingElement.validation);
                }
                orderFormCopy[formElementIdentifier] = processingElement;
            }
            this.setState({ orderForm: orderFormCopy, formInit: false, formIsValid: true })
        }

    }
    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            incredient: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId,
            orderedOn: new Date().toString().slice(4, 24),
            dateEnd: new Date(new Date().getTime() + 30 * 60000),
            orderStatus: "Delivering"
        }
        this.props.onOrderBurger(order, this.props.token);
    }
    eventHandler = (event, id) => {
        let orderFormCopy = { ...this.state.orderForm };
        let selectedInput = { ...orderFormCopy[id] };
        selectedInput.value = event.target.value;
        if (id !== 'deliveryMethod') {
            selectedInput.valid = this.checkValidity(selectedInput.value, selectedInput.validation);
        }
        selectedInput.touched = true;
        orderFormCopy[id] = selectedInput;
        let formValid = true;
        for (let inputIdentifier in orderFormCopy) {
            if (orderFormCopy[inputIdentifier].elementType !== 'select') {
                formValid = orderFormCopy[inputIdentifier].valid && formValid;
            }
        }
        this.setState({ orderForm: orderFormCopy, formIsValid: formValid });
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length <= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length >= rules.maxLength && isValid;
        }
        return isValid;
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (<div className="ContactData" >
            <h4>Enter your Contact Data</h4>
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invlid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                    />
                ))}
                <button className="btn btn-success ml-2" disabled={!this.state.formIsValid} type="submit">{this.state.formisValid} + Order</button>
            </form>
        </div >)
        if (this.props.loading) {
            form = <Spinner />
        }
        return form
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.incredient,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
        signup: state.signup
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actionCreators.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));