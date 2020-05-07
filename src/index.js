import React, { useState, useRef, useEffect } from 'react';
import { render } from 'react-dom';
import 'babel-polyfill';

import ApolloClient from 'apollo-boost';
import { ApolloProvider, useMutation } from '@apollo/react-hooks';
import { Provider } from 'react-redux';
import './styles/index.css';
import { Layout, Affix } from 'antd';
import {
    AppHeader,
    Home,
    NotFound,
    MonthForecast,
    Login,
    User,
} from './sections';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { store } from '../src/store/store';
import { LOG_IN } from './lib/graphql/mutations';

const client = new ApolloClient({
    uri: 'http://localhost:9000/api',
    request: async (operation) => {
        const token = sessionStorage.getItem('token');
        operation.setContext({
            headers: {
                'X-CSRF-TOKEN': token || '',
            },
        });
    },
});

const initialViewer = {
    id: null,
    token: null,
    avatar: null,
    didRequest: false,
};

const App = () => {
    const [viewer, setViewer] = useState(initialViewer);
    const [LogIn, { error }] = useMutation(LOG_IN, {
        onCompleted: (data) => {
            if (data && data.logIn) {
                setViewer(data.logIn);
                console.log(data, 'datadatadata');
                if (data.logIn.token) {
                    sessionStorage.setItem('token', data.logIn.token);
                } else {
                    sessionStorage.removeItem('token');
                }
            }
        },
    });
    const logInRef = useRef(LogIn);

    useEffect(() => {
        logInRef.current();
    }, []);

    return (
        <Router>
            <Layout id="app">
                <Affix offsetTop={0} className="app__affix-header">
                    <AppHeader viewer={viewer} setViewer={setViewer} />
                </Affix>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route
                        exact
                        path="/month-forecast"
                        component={MonthForecast}
                    />
                    <Route
                        exact
                        path="/login"
                        render={(props) => (
                            <Login {...props} setViewer={setViewer} />
                        )}
                    />
                    <Route exact path="/user/:id" component={User} />
                    <Route component={NotFound} />
                </Switch>
            </Layout>
        </Router>
    );
};

render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <App />
        </Provider>
    </ApolloProvider>,
    document.getElementById('root'),
);
