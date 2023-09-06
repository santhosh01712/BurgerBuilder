import React from 'react';
import './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToogle from '../SideDrawer/DrawerToogle';

const Toolbar = (props) =>
    <header className="Toolbar">
        <DrawerToogle clicked={props.drawerToogleClicked} />
        <div style={{ height: '80%' }}>
            <Logo />
        </div>
        <nav className="DesktopOnly">
            <NavigationItems isAuth={props.isAuth} />
        </nav>
    </header>


export default Toolbar;