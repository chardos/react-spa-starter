import React from 'react';
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            sessionStorage.getItem('id_token') ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/sign-in",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default PrivateRoute;
