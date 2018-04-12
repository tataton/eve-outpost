import React, { Fragment } from 'react';
import NavBarContainer from '../containers/NavBarContainer';
import ErrorDisplayContainer from '../containers/ErrorDisplayContainer';
import MainContainer from '../containers/MainContainer';

const View = () => {
    return (
        <Fragment>
            <NavBarContainer />
            <ErrorDisplayContainer />
            <MainContainer />
        </Fragment>
    )
};

export default View;