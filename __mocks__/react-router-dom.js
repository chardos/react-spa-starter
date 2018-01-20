/* eslint-disable */
import React from 'react';
const RRD = require('react-router-dom');
// Just render plain div with its children
RRD.BrowserRouter = ({children}) => <div>{children}</div>

RRD.Link = ({children}) => <div>{children}</div>
module.exports = RRD;
