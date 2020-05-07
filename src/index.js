import React from 'react';
import 'babel-polyfill';
import { render } from 'react-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider, useMutation } from "@apollo/react-hooks";
import { Provider } from 'react-redux';
import './styles/index.css';
import { Layout, Affix } from 'antd';
import { AppHeader, Home, NotFound, MonthForecast } from './sections';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { store } from '../src/store/store';


const client = new ApolloClient({
    uri: "/api",
});



const App = () => {
    return (
        <Router>
            <Layout id="app">
                <Affix offsetTop={0} className="app__affix-header">
                    <AppHeader />
                </Affix>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route
                        exact
                        path="/month-forecast"
                        component={MonthForecast}
                    />
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
