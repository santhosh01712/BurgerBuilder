import React, { Component } from "react";
import "./Order.css";
// import DeliveryLogo from '../../../assets/images/46046.png';
class Order extends Component {
  state = {
    expiresin: new Date(this.props.dateEnd) - new Date(),
    mounted: false,
    update: false,
    cancelClicked: false,
    deliverCalled: false,
  };
  componentDidUpdate() {
    if (this.state.expiresin > 0) {
      setTimeout(() => {
        this.setState((prevState) => {
          return {
            expiresin: prevState.expiresin - 1000,
          };
        });
      }, 1000);
    }
    if (
      this.state.expiresin <= 0 &&
      this.props.orderStatus !== "Delivered" &&
      !this.state.deliverCalled
    ) {
      this.setState({ deliverCalled: true });
      this.props.updateToDelivered("delivered");
    }
  }
  componentDidMount() {
    if (this.state.expiresin > 0) {
      setTimeout(() => {
        this.setState((prevState) => {
          return {
            expiresin: prevState.expiresin - 1000,
          };
        });
      }, 1000);
    }
    if (
      this.state.expiresin <= 0 &&
      this.props.orderStatus !== "Delivered" &&
      !this.state.deliverCalled
    ) {
      this.setState({ deliverCalled: true });
      this.props.updateToDelivered("delivered");
    }
  }
  cancelbuttonHandler = () => {
    this.setState({ cancelClicked: true });
    this.props.updateToDelivered("cancelled");
  };
  render() {
    const incredients = [];
    for (let incredientName in this.props.incredient) {
      incredients.push({
        name: incredientName,
        amount: this.props.incredient[incredientName],
      });
    }
    const incOutput = incredients.map((ig) => {
      return (
        <span
          style={{
            textTransform: "capitalize",
            display: "inline-block",
            backgroundColor: "lightcyan",
            margin: "0 8px",
            border: "1px solid #ccc",
            padding: "5px",
          }}
          key={ig.name}
        >
          {ig.name} [{ig.amount}]
        </span>
      );
    });

    const seconds = Math.floor((this.state.expiresin % 60000) / 1000);
    const minutes = Math.floor(this.state.expiresin / 60000);

    let delivery = (
      <div className="row">
        <p className="col-sm-6">
          Your Order has been delivered, Enjoy your Burger!
        </p>
        <p className="col-sm-3 offset-3">
          <strong>Order Status:</strong> Delivered
        </p>
      </div>
    );
    if (this.state.expiresin > 0) {
      const myvalue = 10 - (seconds % 10);
      const variableClassName = "col-sm-1 offset-" + myvalue;
      delivery = (
        <div className="row">
          <p className="col-sm-6">
            Your Order will be delivered in:
            <strong> {`${minutes} : ${seconds}`} </strong>
          </p>
          <div className="col-sm-3 offset-3">
            <button
              className="btn btn-warning"
              onClick={this.cancelbuttonHandler}
            >
              Cancel Order
            </button>
          </div>
          <img
            src={""}
            alt="icon not avialable"
            className={variableClassName}
            style={{ height: "50px" }}
          />
        </div>
      );
    }
    if (this.props.orderStatus === "Cancelled" || this.state.cancelClicked) {
      delivery = (
        <div className="row">
          <p className="col-sm-6">Your Order has been Cancelled!!</p>
          <p className="col-sm-3 offset-3">
            <strong>Order Status:</strong> Cancelled
          </p>
        </div>
      );
    }

    return (
      <React.Fragment>
        <div className="Order jumbotron">
          <div className="container row">
            <p className="col-sm-7">
              <strong>Incredients :</strong> {incOutput}
            </p>
            <p className="col-sm-2">
              Price : <strong>Rs. {this.props.price}</strong>
            </p>
            <p className="col-sm-3">
              <strong>{this.props.orderedOn}</strong>
            </p>
          </div>
          {delivery}
        </div>
      </React.Fragment>
    );
  }
}

export default Order;
