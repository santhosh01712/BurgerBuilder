import React from 'react';
import BurgerLogo from '../../assets/images/burgerLogo.jfif';
import './Logo.css'

const Logo = (props) => {
    return (
        <div className="Logo" >
            <img src={BurgerLogo} alt="MyBurger" />
        </div>
    );
}

export default Logo;