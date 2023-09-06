import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/action/actionsDefault';


class Logout extends Component {
    componentDidMount() {
        this.props.signout();
        this.props.logout();
    }
    render() {
        return (
            <Redirect to='/' />
        );
    }
}
const dispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actionCreators.logout()),
        signout: () => dispatch(actionCreators.signout())
    }
}

export default connect(null, dispatchToProps)(Logout);