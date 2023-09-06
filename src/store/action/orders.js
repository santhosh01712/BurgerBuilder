import axios from "../../axios-orders";
import * as actionTypes from "./actionsTypes";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch((e) => {
        dispatch(purchaseBurgerFailed(e));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrderSuccess = (order) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: order,
  };
};

export const fetchOrderFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error: error,
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrderStart());
    const queryParms =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("./orders.json" + queryParms)
      .then((res) => {
        const fetchedData = [];
        for (let key in res.data) {
          fetchedData.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrderSuccess(fetchedData));
      })
      .catch((err) => {
        dispatch(fetchOrderFailed(err));
      });
  };
};
