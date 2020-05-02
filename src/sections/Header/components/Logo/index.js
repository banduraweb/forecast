import React from 'react';

import logo from '../../assets/logo.png';

export const Logo = () => {
    return (
        <div className="app-header__logo-search-section">
            <div className="app-header__logo">
                <img src={logo} alt="App logo" />
            </div>
        </div>
    );
};
