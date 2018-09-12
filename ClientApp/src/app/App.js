import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Rollbar from 'rollbar';
import moment from 'moment';
import 'moment/min/locales';
import browserLocale from 'browser-locale';

import styled from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import orange from '@material-ui/core/colors/orange';

import WaitTime from '../waittime/WaitTime';
import NotFound from './NotFound';
import Locations from './Locations';
import ErrorPage from './Error';
import ErrorBoundary from '../common/ErrorBoundary';

import BackgroundImage from '../assets/resort-carousel-bg.jpg';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: lightBlue,
        secondary: orange,
        background: {
            paper: '#343434',
            default: '#282828',
        },
        divider: 'rgba(230, 230, 230, 0.12)',
    }
});

Rollbar.init({
    accessToken: "77405bf881c942f5a153ceb6b8be9081",
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
        environment: process.env.NODE_ENV
    }
});

moment.locale(browserLocale());

const Background = styled.div`
    background-image: url(${BackgroundImage});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat; 
    background-attachment: fixed;
`;

export default () => (
    <CssBaseline>
        <MuiThemeProvider theme={theme}>
            <Background>
                <ErrorBoundary component={ErrorPage}>
                    <BrowserRouter>
                        <Switch>
                            {Locations.WaitTime.toRoute({ component: WaitTime, invalid: NotFound }, true)}
                            <Redirect from='/' to={Locations.WaitTime.toUrl({ slug: 'serre-chevalier-vallee' })} exact />
                            <Route component={NotFound} />
                        </Switch>
                    </BrowserRouter>
                </ErrorBoundary>
            </Background>
        </MuiThemeProvider>
    </CssBaseline>
);
