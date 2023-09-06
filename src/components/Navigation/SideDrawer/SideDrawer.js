import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.css';
import Aux from '../.././../hoc/Auxillary';


const SideDrawer = (props) => {

    let attchaedClasses = "SideDrawer Close";
    if (props.show) {
        attchaedClasses = "SideDrawer Open";
    }
    return (
        <Aux>
            {props.show ?
                <div className="MyBackdrop" onClick={props.closed}></div> : null
            }
            <div className={attchaedClasses} onClick={props.closed}>
                <div style={{ height: '11%', marginBottom: '32px' }}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth} />
                </nav>
            </div>
        </Aux >
    );
}

export default SideDrawer;