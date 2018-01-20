import React from "react";
import { render } from "react-dom";
import App from "components/App";
import 'normalize.css';
import './Index.scss';

const Index = () => (
    <App />
);

export default Index;

render(<Index />, document.querySelector(".mainContent"));
