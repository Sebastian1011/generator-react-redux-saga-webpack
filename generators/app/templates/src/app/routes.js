'use strict';
import React from 'react';
import { Route } from 'react-router';
import AuthChecker from './pages/layout/authChecker';
import LoginPage from './pages/loginPage/loginPage';
import Layout from "./pages/layout/layout";
import Testpage from  './pages/test/test';
const routes = () =>(
    <div>
        <Route path="/" component={TestPage}/>
        <Route path="/login" component={LoginPage}/>
    </div>
);
export default routes;
