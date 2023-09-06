import React, { Component } from 'react';
import Aux from '../../hoc/Auxillary';
import './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component {
    state = {
        showSideDrawer: true
    }
    sideDraweClosed = () => {
        this.setState({ showSideDrawer: false })
    }
    sideDrawerToogle = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }
    render() {
        return (
            <Aux>
                <div>
                    <Toolbar
                        isAuth={this.props.isAuththenticated}
                        drawerToogleClicked={this.sideDrawerToogle} />
                    <SideDrawer
                        isAuth={this.props.isAuththenticated}
                        show={this.state.showSideDrawer}
                        closed={this.sideDraweClosed}
                    />
                </div>
                <main className="Content">
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStoreToProps = state => {
    return {
        isAuththenticated: state.auth.token !== null
    };
}

export default connect(mapStoreToProps)(Layout);

