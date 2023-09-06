import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import "./BuildControls.css";
const controls = [
  { label: "Salad", type: "salad" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" },
];
const BuildControls = (props) => {
  return (
    <div className="BuildControls">
      <p>
        Current Price: <strong>Rs. {props.price.toFixed(2)} </strong>{" "}
      </p>
      {controls.map((cntrl) => (
        <BuildControl
          key={cntrl.label}
          label={cntrl.label}
          added={() => props.incredientAdded(cntrl.type)}
          removed={() => props.incredientRemoved(cntrl.type)}
          disable={props.diabled[cntrl.type]}
        />
      ))}
      <button
        className="btn btn-warning"
        disabled={!props.purchasable}
        onClick={props.order}
      >
        {props.isAuth ? "Order Now" : "Sign-In to Continue"}
      </button>
    </div>
  );
};

export default BuildControls;
