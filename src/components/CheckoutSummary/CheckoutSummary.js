import React from 'react';
import Burger from '../Burger/Burger';
import './CheckoutSummary.css';

const CheckoutSummary = (props) => {
    return (
        <div className="CheckoutSummary">
            <h1>We hope it taste well</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger incredient={props.incredient} />
            </div>
            <button
                className="btn btn-danger mr-2"
                onClick={props.checkoutcancelled}>Cancel</button>
            <button
                className="btn btn-success"
                onClick={props.checkoutcontinue}>Continue</button>
        </div>
    );
}

export default CheckoutSummary;