import React from 'react';
import { Logo, GooglePlacesAutocomplete, MenuItems } from './components';
import { ErrorBanner } from '../../components';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';

const { Header } = Layout;

export const AppHeader = () => {
    const errorFetching = useSelector((state) => state.errorFetching);

    return (
        <div>
            <Header className="app-header">
                <Logo />
                <GooglePlacesAutocomplete />
                <div className="app-header__menu-section">
                    {errorFetching ? <ErrorBanner /> : <MenuItems />}
                </div>
            </Header>
        </div>
    );
};
