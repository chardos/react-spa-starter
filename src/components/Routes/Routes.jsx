import React from 'react';
import { Route, Switch } from "react-router-dom";
import Homepage from "scenes/Homepage";
import NotFound from "scenes/NotFound";

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Homepage} />
        <Route component={NotFound} />
    </Switch>
)

export default Routes;
