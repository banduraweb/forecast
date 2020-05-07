import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Avatar, Button, Menu } from 'antd';
import { HomeOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { LOG_OUT } from '../../../../lib/graphql/mutations';
import {
    displaySuccessNotification,
    displayErrorMessage,
} from '../../../../lib/utils';

const { Item, SubMenu } = Menu;

export const Registration = ({ viewer, setViewer }) => {
    const [logOut] = useMutation(LOG_OUT, {
        onCompleted: (data) => {
            if (data?.logOut) {
                setViewer(data.logOut);
                displaySuccessNotification("You've successfully logged out!");
            }
        },
        onError: () => {
            displayErrorMessage(
                "Sorry! We weren't able to log you out. Please try again later!",
            );
        },
    });

    const handleLogOut = () => {
        logOut();
    };

    const subMenuLogin =
        viewer.id && viewer.avatar ? (
            <SubMenu title={<Avatar src={viewer.avatar} />}>
                <Item key="/user">
                    <Link to={`/user/${viewer.id}`}>
                        <UserOutlined />
                        Profile
                    </Link>
                </Item>
                <Item key="/logout">
                    <div onClick={handleLogOut}>
                        <LogoutOutlined />
                        Log out
                    </div>
                </Item>
            </SubMenu>
        ) : (
            <Item>
                <Link to="/login">
                    <Button type="primary">Sign In</Button>
                </Link>
            </Item>
        );

    return (
        <Menu mode="horizontal" selectable={false} className="menu">
            <Item key="/rainbow">
                <Link to="/rainbow">
                    <span role="img" aria-label="emoji">
                        🌈
                    </span>
                    Rainbow
                </Link>
            </Item>
            {subMenuLogin}
        </Menu>
    );
};
