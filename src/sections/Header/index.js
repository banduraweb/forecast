import React from 'react';
import { Logo, GooglePlacesAutocomplete, MenuItems } from './components';

import { Layout } from 'antd';

const { Header } = Layout;

export const AppHeader = () => {
    return (
        <Header className="app-header">
            <Logo />
            <GooglePlacesAutocomplete />
            <div className="app-header__menu-section">
                <MenuItems />
            </div>
        </Header>
    );
};
