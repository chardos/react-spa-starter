import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "components/Header";
import { Provider } from 'react-redux';
import store from 'store';
import Routes from 'components/Routes';

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Header />
                <Routes />
            </div>
        </BrowserRouter>
    </Provider>
);

export default App;
