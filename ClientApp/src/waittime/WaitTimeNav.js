import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { compose } from 'redux';

import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';

import DateNav from './DateNav';
import ResortList from '../common/ResortList';
import Locations from '../app/Locations';

const DESKTOP_BREAKPOINT = 600;

const ResortName = styled.span`
    flex: auto;
    vertical-align: middle;
    text-transform: uppercase;
    border: none;
    font-family: "Gotham A", "Century Gothic", sans-serif;
    font-weight: 800;
    @media (min-width: ${DESKTOP_BREAKPOINT}px) {
        font-size: 28px;
        color: #FFF;
        padding: 2px 5px 2px 5px;
        margin-right: 10px;
    }
`;

const styles = theme => ({
    resortDrawer: {
        backgroundColor: theme.palette.background.default,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});

class WaitTimeNav extends Component {
    state = {
        showMenu: false,
    }

    handleToggleMenu = show => {
        this.setState({
            showMenu: show,
        });
    }

    handleSelectDate = date => {
        const locationProps = {
            slug: this.props.resort.slug,
            date: date.format('YYYY-MM-DD'),
        };
        this.props.history.push(Locations.WaitTime.toUrl(locationProps));
    }

    render() {
        const { resort, date, classes, width } = this.props;
        const dateDisplayFormat = isWidthUp('sm', width)
            ? 'dddd, LL'
            : 'ddd, ll';
        const dateNavStyle = isWidthUp('sm', width)
            ? { minWidth: 400, display: 'inline-flex' }
            : { padding: '0px 10px' };

        return (
            <div>
                <AppBar position="static" color='default'>
                    <Toolbar>
                        <IconButton
                            className={classes.menuButton}
                            aria-label="Menu"
                            onClick={() => this.handleToggleMenu(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <ResortName>{(resort && resort.name) || 'Loading'} Wait Times</ResortName>
                        <Hidden smDown>
                            <DateNav
                                dates={resort && resort.dates}
                                date={date}
                                displayFormat={dateDisplayFormat}
                                style={dateNavStyle}
                                selectDate={this.handleSelectDate}
                            />
                        </Hidden>
                    </Toolbar>
                </AppBar>
                <Hidden mdUp>
                    <DateNav
                        dates={resort && resort.dates}
                        date={date}
                        displayFormat={dateDisplayFormat}
                        style={dateNavStyle}
                        selectDate={this.handleSelectDate}
                    />
                </Hidden>
                <Drawer open={this.state.showMenu} onClose={() => this.handleToggleMenu(false)} classes={{ paper: classes.resortDrawer }}>
                    <ResortList linkTo={resort => Locations.WaitTime.toUrl({ slug: resort.slug })} onClick={() => this.handleToggleMenu(false)} />
                </Drawer>
            </div>
        );
    };
}

export default compose(
    withRouter,
    withWidth(),
    withStyles(styles),
)(WaitTimeNav);
