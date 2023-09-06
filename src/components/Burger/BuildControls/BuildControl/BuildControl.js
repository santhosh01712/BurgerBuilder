import React from 'react';
import './BuildControl.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const BuildControl = (props) => {
    return (
        <div className="BuildControl container">
            <div className="col-sm-3"></div>
            <div className="col-sm-1 font-weight-bold">{props.label}</div>
            <button
                className="btn btn-warning col-sm-1"
                onClick={props.removed}
                disabled={props.disable}> Less
            </button>
            <button
                className="btn col-sm-1"
                style={{ backgroundColor: 'darkorange' }}
                onClick={props.added}>More
            </button>
            <div className="col-sm-6"></div>
        </div>
    )
}

export default BuildControl;