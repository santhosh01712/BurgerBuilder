import React, { Component } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Data from "./DataFetch.json";
import "./LoginSignup.css";
import { connect } from "react-redux";
import * as actionCreators from "../store/action/actionsDefault";
import Spinner from "../components/UI/Spinner/Spinner";

class Signup extends Component {
  state = {
    formData: Data,
    formreset: true,
  };

  errorHandler(copiedformData, key) {
    if (key === "userName") {
      if (copiedformData["userName"].data.length < 8) {
        return "Username should contain minimum 8 characters";
      }
      const user = copiedformData["userName"].data.trim();
      Axios.get(
        "https://react-my-burger-d0e0e-default-rtdb.firebaseio.com/BurgerUser/" +
          user +
          ".json"
      )
        .then((res) => {
          if (res.data !== null) {
            copiedformData["userName"].errorMessage = "Username not available";
            this.setState({ formData: copiedformData });
          } else {
            return null;
          }
        })
        .catch((rej) => {
          console.log(rej);
        });
    }
    if (key === "phone") {
      if (copiedformData["phone"].data.length < 10) {
        return "Enter a valid Phone number";
      }
    }
    if (key === "password") {
      if (copiedformData["password"].data.length < 7) {
        return "Password is weak";
      }
    }
    if (key === "confirmPassword") {
      if (
        copiedformData["confirmPassword"].data !==
        copiedformData["password"].data
      ) {
        return "Passwords do not match";
      }
    }
  }
  inputHandler = (event, key) => {
    let copiedformData = this.state.formData;
    let selectedElement = copiedformData[key];
    selectedElement.data = event.target.value;
    const errorMessage = this.errorHandler(copiedformData, key);
    selectedElement.errorMessage = errorMessage;
    copiedformData[key] = selectedElement;
    this.setState({ formData: copiedformData });
  };
  signupHandler = (event) => {
    event.preventDefault();
    let copiedformData = this.state.formData;
    this.props.signup(
      copiedformData["email"].data,
      copiedformData["password"].data,
      copiedformData["name"].data,
      copiedformData["phone"].data,
      copiedformData["street"].data,
      copiedformData["zipcode"].data,
      copiedformData["country"].data
    );
  };

  render() {
    const FormElements = [];
    for (let key in this.state.formData) {
      const element = this.state.formData[key];
      FormElements.push(
        <div className="form-group" key={key}>
          <input
            {...element.config}
            value={element.data}
            onChange={(event) => this.inputHandler(event, key)}
          />
          <div>
            <span>{element.errorMessage}</span>
          </div>
        </div>
      );
    }
    let extraData = (
      <React.Fragment>
        <h3>Sign up</h3>
        <form className="vertical-form">
          {FormElements}
          <button
            type="submit"
            className="btn btn-success mr-2"
            onClick={this.signupHandler}
          >
            SignUp
          </button>
        </form>
      </React.Fragment>
    );
    if (this.props.userWasSet) {
      extraData = (
        <div>
          <h3 className="text text-bold text-primary">
            Signup was successfull
          </h3>
          <button
            className="btn btn-primary m-1"
            onClick={() => {
              this.props.history.push("/");
              window.location.reload();
            }}
          >
            Start building your Burger
          </button>
        </div>
      );
    }
    return this.props.loading ? (
      <Spinner />
    ) : (
      <React.Fragment>
        <div className="container col-sm-5 col-offset-4  LoginSignup">
          <div className="jumbotron">{extraData}</div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.signup.loading,
    userWasSet: state.signup.userWasSet,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signup: (email, password, name, phone, street, zipcode, country) =>
      dispatch(
        actionCreators.signup(
          email,
          password,
          name,
          phone,
          street,
          zipcode,
          country
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
