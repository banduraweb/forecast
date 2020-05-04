import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Menu } from 'antd';

const { Item } = Menu;

export const MenuItems = () => {
    const location = useLocation();
    return (
        <Menu mode="horizontal" selectable={false} className="menu">
            <Item>
                <Link
                    to={`${
                        location.pathname === '/' ? '/month-forecast' : '/'
                    }`}
                >
                    <Button type="primary">{`${
                        location.pathname === '/'
                            ? 'Get Month Forecast'
                            : 'Home'
                    }`}</Button>
                </Link>
            </Item>
        </Menu>
    );
};
