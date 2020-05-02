import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu } from 'antd';

const { Item } = Menu;

export const MenuItems = () => {
    return (
        <Menu mode="horizontal" selectable={false} className="menu">
            <Item>
                <Link to="/login">
                    <Button type="primary">Sign In</Button>
                </Link>
            </Item>
        </Menu>
    );
};
