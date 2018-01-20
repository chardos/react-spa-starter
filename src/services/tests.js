/* eslint-disable */
import React from 'react';
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import store from "store";

/*
 * withProvider - A high order component that wraps a component with a Provider
 */
export const withProvider = WrappedComponent => {
    return class WithProvider extends React.Component {
        render() {
            return (
                <Provider store={store}>
                    <WrappedComponent {...this.props} />
                </Provider>
            );
        }
    };
};

/*
 * withTestRouter - A high order component that wraps a component with a Router
 */
export const withTestRouter = WrappedComponent => {
    return class WithRouter extends React.Component {
        render() {
            return (
                <Router>
                    <WrappedComponent {...this.props} />
                </Router>
            );
        }
    };
};
