import React, { Component } from 'react';
import Aux from '../../../hoc/Auxillary';

class OrderSummary extends Component {

    render() {
        const incredientSummary = Object.keys(this.props.incredients)
            .map(igKey => {
                return <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>
                 :  {this.props.incredients[igKey]}</li>
            });
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>Delicious Burger with the following incredient;</p>
                <ul>
                    {incredientSummary}
                </ul>
                <h5>Your Total Bill amount is : <strong>Rs. {this.props.price.toFixed(2)} </strong></h5>
                <p>Continue to Checkout?</p>
                <button
                    className="btn btn-success"
                    onClick={this.props.continued}>Continue</button>
                <button
                    className="btn m-1 btn-danger"
                    onClick={this.props.cancelled}>
                    Cancel</button>

            </Aux>
        );
    }

}

export default OrderSummary;