import React, { useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { Card, Layout, Spin, Typography } from 'antd';
import { ErrorBanner } from '../../components';
import { LOG_IN } from '../../lib/graphql/mutations';
import { AUTH_URL } from '../../lib/graphql/queries';

import {
    displayErrorMessage,
    displaySuccessNotification,
} from '../../lib/utils';

import googleLogo from './assets/google_logo.jpg';

const { Content } = Layout;
const { Text, Title } = Typography;

export const Login = ({ setViewer }) => {
    const client = useApolloClient();
    const [
        logIn,
        { data: logInData, loading: logInLoading, error: logInError },
    ] = useMutation(LOG_IN, {
        onCompleted: (data) => {
            console.log(data);
            if (data?.logIn && data.logIn.token) {
                console.log('me here');
                setViewer(data.logIn);
                sessionStorage.setItem('token', data.logIn.token);
                displaySuccessNotification('You have successfully logged in!');
            }
        },
    });
    const logInRef = useRef(logIn);

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get('code');
        if (code) {
            logInRef.current({
                variables: {
                    input: { code },
                },
            });
        }
    }, []);

    const handleAuthorize = async () => {
        try {
            const { data } = await client.query({
                query: AUTH_URL,
            });
            window.location.href = data.authUrl;
        } catch {
            displayErrorMessage(
                `Sorry! We weren't able to log you in. Please try again later!`,
            );
        }
    };

    if (logInLoading) {
        return (
            <Content className="log-in">
                <Spin size="large" tip="Logging you in..." />
            </Content>
        );
    }

    if (logInData?.logIn) {
        const { id: viewerId } = logInData.logIn;
        console.log(logInData.logIn, 'logInData.logIn');
        return <Redirect to={`/user/${viewerId}`} />;
    }

    const LogInBannerError = logInError ? (
        <ErrorBanner
            message=""
            description={`Sorry! We weren't able to log you in. Please try again later!`}
        />
    ) : null;

    return (
        <Content className="log-in">
            {LogInBannerError}
            <Card className="log-in-card">
                <div className="log-in-card__intro">
                    <Title level={3} className="log-in-card__intro-title">
                        <span role="img" aria-label="emoji">
                            ⛈️🌞 🌈
                        </span>
                    </Title>
                    <Title level={3} className="log-in-card__intro-title">
                        Log in to Sunset 🆚 Sunrise!
                    </Title>
                    <Text>Sign in with Google to see the rainbow!</Text>
                </div>
                <button
                    className="log-in-card__google-button"
                    onClick={handleAuthorize}
                >
                    <img
                        src={googleLogo}
                        alt="Google Logo"
                        className="log-in-card__google-button-logo"
                    />
                    <span className="log-in-card__google-button-text">
                        Sign in with Google
                    </span>
                </button>
                <Text type="secondary">
                    Note: By signing in, you'll be redirected to the{' '}
                    <span style={{ color: '#4285F4' }}>Google consent</span>{' '}
                    form to sign in with your{' '}
                    <span style={{ color: '#4285F4' }}>Google account.</span>
                </Text>
            </Card>
        </Content>
    );
};
