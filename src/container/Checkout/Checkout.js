import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';


class Checkout extends Component {
    checkoutContinueHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }
    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    render() {
        const purchasedMap = this.props.purchased ? <Redirect to='/' /> : null;
        const summary = this.props.ings ?
            <div>
                {purchasedMap}
                <CheckoutSummary
                    incredient={this.props.ings}
                    checkoutcontinue={this.checkoutContinueHandler}
                    checkoutcancelled={this.checkoutCancelHandler} />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData} />
            </div>
            : <Redirect to='/' />
        return summary
    }
}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.incredient,
        purchased: state.order.purchased
    }
};

export default connect(mapStateToProps)(Checkout);