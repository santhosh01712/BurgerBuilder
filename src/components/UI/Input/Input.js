import React from 'react';
import './Input.css';

const input = (props) => {
    let inputElement = null;
    let InputClasses = "InputElement";
    if (props.touched) {
        if (props.invlid && props.shouldValidate) {
            InputClasses += " Invalid";
        } else {
            if (props.shouldValidate) {
                InputClasses += " Valid";
            }
        }
        if (props.elementType === 'select' && props.touched) {
            InputClasses += " Valid";
        }
    }


    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={InputClasses} {...props.elementConfig} value={props.value} />
            break;
        case ('textarea'):
            inputElement = <textarea className={InputClasses} {...props.elementConfig} value={props.value} />
            break;
        case ('select'):
            inputElement = (
                <select className={InputClasses} value={props.value} onChange={props.elementConfig.onChange}>
                    {props.elementConfig.options.map(option => (
                        <option
                            value={option.value}
                            key={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>)
            break;
        default:
            inputElement = <input className={InputClasses} {...props.elementConfig} value={props.value} />

    }
    return (
        <div className="Input" >
            <label className="Label">{props.label}</label>
            {inputElement}

        </div>
    );
}

export default input;