import React, { Component } from "react";
import Aux from "../../hoc/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";
import { connect } from "react-redux";
import * as actionCreators from "../../store/action/actionsDefault";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  updatePurchasable(incredients) {
    const sum = Object.keys(incredients)
      .map((igKey) => {
        return incredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }
  purchaseHandler = () => {
    console.log(this.props.isAuth);
    if (this.props.isAuth) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };
  purchaseCancelled = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinued = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };
  componentDidMount() {
    this.props.loadIncredient();
  }
  render() {
    const diabledInfo = {
      ...this.props.ings,
    };
    for (let key in diabledInfo) {
      diabledInfo[key] = diabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Incredients cannot be added</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings && !this.props.error) {
      burger = (
        <Aux>
          <Burger incredient={this.props.ings} />
          <BuildControls
            incredientAdded={this.props.onIncredientAdded}
            incredientRemoved={this.props.onIncredientRemoved}
            diabled={diabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchasable(this.props.ings)}
            order={this.purchaseHandler}
            isAuth={this.props.isAuth}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          incredients={this.props.ings}
          cancelled={this.purchaseCancelled}
          continued={this.purchaseContinued}
          price={this.props.price}
        />
      );
    }
    return (
      <Aux>
        {this.props.userWasSet ? <h4>Welcome {this.props.name} !!!</h4> : null}
        <Modal
          show={this.state.purchasing}
          modelClosed={this.purchaseCancelled}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.incredient,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null,
    name: state.signup.name,
    userWasSet: state.signup.userWasSet,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncredientAdded: (ingname) =>
      dispatch(actionCreators.addIncredient(ingname)),
    onIncredientRemoved: (ingname) =>
      dispatch(actionCreators.removeIncredient(ingname)),
    loadIncredient: () => dispatch(actionCreators.initIncredient()),
    onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actionCreators.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
