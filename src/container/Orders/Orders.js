import React, { Component } from 'react';
import Order from '../../components/Burger/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import * as actionCreators from '../../store/action/actionsDefault';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';


class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }
    updateTheStatus = (order, type) => {
        if (order.orderStatus === "Delivering") {
            let newOrder = null;
            if (type === "delivered") {
                newOrder = {
                    incredient: order.incredient,
                    price: order.price,
                    orderData: order.orderData,
                    userId: order.userId,
                    orderedOn: order.orderedOn,
                    dateEnd: order.dateEnd,
                    orderStatus: "Delivered"
                }
            } else {
                newOrder = {
                    incredient: order.incredient,
                    price: order.price,
                    orderData: order.orderData,
                    userId: order.userId,
                    orderedOn: order.orderedOn,
                    dateEnd: new Date(),
                    orderStatus: "Cancelled"
                }
            }
            if (order.orderStatus !== "Cancelled" && order.orderStatus !== "Delivered") {
                axios.put("/orders/" + order.id + ".json?auth=" + this.props.token, newOrder)
                    .then(res => {
                        console.log("order " + type);
                    })
                    .catch(err => {
                        console.log(err.res.data)
                    })
            }
        }
    }
    render() {
        const orderJSX = this.props.loading ? <Spinner /> : (<div>
            {this.props.orders.map(order => {
                return (
                    <Order key={order.id}
                        incredient={order.incredient}
                        price={order.price.toFixed(2)}
                        orderedOn={order.orderedOn}
                        dateEnd={order.dateEnd}
                        orderStatus={order.orderStatus}
                        updateToDelivered={(type) => this.updateTheStatus(order, type)}
                    />)
            }
            )}
        </div>)
        return orderJSX;
    }
}
const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actionCreators.fetchOrders(token, userId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));