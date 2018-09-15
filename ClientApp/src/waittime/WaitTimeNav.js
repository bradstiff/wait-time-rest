import React from 'react';
import PropTypes from 'prop-types';
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

const ResortName = styled.span`
    flex: auto;
    vertical-align: middle;
    text-transform: uppercase;
    border: none;
    font-family: "Gotham A", "Century Gothic", sans-serif;
    font-weight: 800;
    @media (min-width: 600px) {
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
    },
});

class WaitTimeNav extends React.PureComponent {
    static propTypes = {
        slug: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        dates: PropTypes.arrayOf(PropTypes.object),
        date: PropTypes.object,
    }

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
            slug: this.props.slug,
            date: date.format('YYYY-MM-DD'),
        };
        this.props.history.push(Locations.WaitTime.toUrl(locationProps));
    }

    render() {
        const { name, dates, date, classes, width } = this.props;

        const nameDisplay = isWidthUp('md', width)
            ? `${name} Wait Times`
            : name;
        const dateDisplay = isWidthUp('md', width) ? { format: 'dddd, LL', style: { minWidth: 400, display: 'inline-flex' } }
            : isWidthUp('sm', width) ? { format: 'll', style: { minWidth: 250, display: 'inline-flex' } }
            : { format: 'ddd, ll', style: { padding: '0px 10px' } };
        const toolbarVariant = isWidthUp('sm', width)
            ? 'regular'
            : 'dense';
        return (
            <div>
                <AppBar position="static" color='default'>
                    <Toolbar variant={toolbarVariant}>
                        <IconButton
                            className={classes.menuButton}
                            aria-label="Menu"
                            onClick={() => this.handleToggleMenu(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <ResortName>{nameDisplay}</ResortName>
                        <Hidden xsDown>
                            <DateNav
                                dates={dates}
                                date={date}
                                displayFormat={dateDisplay.format}
                                style={dateDisplay.style}
                                selectDate={this.handleSelectDate}
                            />
                        </Hidden>
                    </Toolbar>
                    <Hidden smUp>
                        <DateNav
                            dates={dates}
                            date={date}
                            displayFormat={dateDisplay.format}
                            style={dateDisplay.style}
                            selectDate={this.handleSelectDate}
                        />
                    </Hidden>
                </AppBar>
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
