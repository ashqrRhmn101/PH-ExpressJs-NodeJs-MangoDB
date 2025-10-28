import React from 'react';
import { Outlet } from 'react-router';
import Heasder from './Heasder';

const Main = () => {
    return (
        <div>
            <Heasder/>
            <Outlet/>
        </div>
    );
};

export default Main;