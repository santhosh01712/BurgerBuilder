import React from 'react';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';


const NavigationItems = (props) => {
    return (
        <ul className="NavigationItems">
            <NavigationItem
                link='/'>
                BurgerBuilder</NavigationItem>
            {props.isAuth ? <NavigationItem
                link='/orders'>
                Orders</NavigationItem> : null
            }
            {props.isAuth ?
                <NavigationItem link='/logout'> Logout</NavigationItem>
                : <NavigationItem link='/auth'> Login</NavigationItem>
            }

            {/* <NavigationItem
                link='/login'>
                Login</NavigationItem>  */}

        </ul>
    );
}

export default NavigationItems;