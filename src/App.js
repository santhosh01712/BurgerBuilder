import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./container/BurgerBulider/BurgerBuilder";
import Checkout from "./container/Checkout/Checkout";
import { Route, Switch, Redirect } from "react-router-dom";
import Orders from "./container/Orders/Orders";
import Auth from "./container/Auth/Auth";
import Logout from "./container/Auth/Logout/Logout";
import { connect } from "react-redux";
import Signup from "./LoginSignup/Signup";
import * as actionCreators from "./store/action/actionsDefault";

class App extends React.Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/signup" component={Signup} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
