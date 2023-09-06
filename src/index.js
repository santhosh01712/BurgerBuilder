import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
// import Login from './ZDataDetch/Login';
// import Signup from './ZDataDetch/Signup';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import BurgerReducer from "./store/reducer/burgerBuilder";
import OrderReducer from "./store/reducer/order";
import AuthReducer from "./store/reducer/auth";
import SignupReducer from "./store/reducer/signupHandler";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  burgerBuilder: BurgerReducer,
  order: OrderReducer,
  auth: AuthReducer,
  signup: SignupReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>

  // <Route path='/' exact component={Login} />
  // <Route path='/signup' component={Signup} />
);

ReactDOM.render(app, document.getElementById("root"));
