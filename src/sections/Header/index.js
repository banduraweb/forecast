import React from 'react';
import {
    Logo,
    GooglePlacesAutocomplete,
    MenuItems,
    Registration,
} from './components';
import { ErrorBanner } from '../../components';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';

const { Header } = Layout;

export const AppHeader = ({ viewer, setViewer }) => {
    const errorFetching = useSelector((state) => state.errorFetching);

    return (
        <div>
            <Header className="app-header">
                <Logo />
                <Registration viewer={viewer} setViewer={setViewer} />
                <GooglePlacesAutocomplete />
                <div className="app-header__menu-section">
                    {errorFetching ? <ErrorBanner /> : <MenuItems />}
                </div>
            </Header>
        </div>
    );
};
