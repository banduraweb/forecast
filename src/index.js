import React from 'react';
import 'babel-polyfill';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './styles/index.css';
import { Layout, Affix } from 'antd';
import {
    AppHeader,
    Home,
    NotFound,
    AdditionalForecastInfo,
    Login,
} from './sections';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { store } from '../src/store/store';

const App = () => {
    return (
        <Router>
            <Layout id="app" >
                <Affix offsetTop={0} className="app__affix-header">
                    <AppHeader />
                </Affix>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route
                        exact
                        path="/more-info"
                        component={AdditionalForecastInfo}
                    />
                    <Route exact path="/login" component={Login} />
                    <Route component={NotFound} />
                </Switch>
            </Layout>
        </Router>
    );
};

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
