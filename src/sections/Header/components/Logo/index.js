import React from 'react';

import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

export const Logo = () => {
    return (
        <div className="app-header__logo-search-section">
            <Link to="/">
                <div className="app-header__logo">
                    <img src={logo} alt="App logo" />
                </div>
            </Link>
        </div>
    );
};
