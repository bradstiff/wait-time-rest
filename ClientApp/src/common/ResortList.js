import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { withStyles } from '@material-ui/core/styles';

import { loadResorts } from '../store/Resort';

const styles = theme => ({
    logoContainer: {
        textAlign: 'center',
        width: 170,
    },
    logo: {
        height: 50,
        width: 'auto',
        maxWidth: 170,
        padding: 5,
        marginRight: 5,
        opacity: 0.75,
        cursor: 'pointer',
        '&:hover': {
            opacity: 1
        },
    },
});

class ResortList extends React.Component {
    static propTypes = {
        linkTo: PropTypes.func.isRequired,
        onClick: PropTypes.func,
        chevron: PropTypes.bool,
        loadResorts: PropTypes.func.isRequired,
        resorts: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            logoFilename: PropTypes.string.isRequired,
            liftCount: PropTypes.number.isRequired,
            hasWaitTimes: PropTypes.bool.isRequired,
        })),
    };

    static defaultProps = {
        //display right-aligned chevron (>)
        chevron: false,
    };

    componentDidMount() {
        const { loadResorts } = this.props;
        loadResorts();
    }

    render() {
        const { classes, linkTo, onClick, chevron, resorts } = this.props;
        if (!resorts) {
            return null;
        }
        return (
            <List>
                {resorts.map(resort => {
                    let secondaryText = `${resort.liftCount} lifts`;
                    if (resort.hasWaitTimes) {
                        secondaryText += ', Wait time data';
                    }
                    return (
                        <ListItem key={resort.id} dense button component={Link} to={linkTo(resort)} onClick={onClick}>
                            <div className={classes.logoContainer}>
                                <img alt={resort.name} src={`${process.env.PUBLIC_URL}/logos/${resort.logoFilename}`} className={classes.logo} />
                            </div>
                            <ListItemText primary={resort.name} secondary={secondaryText} />
                            {chevron &&
                                <ListItemIcon>
                                    <ChevronRightIcon />
                                </ListItemIcon>
                            }
                        </ListItem>
                    );
                })}
            </List>
        );
    }
};

const mapStateToProps = state => ({
    resorts: state.resorts.all,
});

export default compose(
    withStyles(styles),
    connect(
        mapStateToProps, {
            loadResorts,
        },
    )
)(ResortList);