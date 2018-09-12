import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import amber from '@material-ui/core/colors/amber';
import { withStyles } from '@material-ui/core/styles';

const baseStyle = theme => ({
    marginTop: theme.spacing.unit * 2,
    padding: theme.spacing.unit,
});

const styles = theme => ({
    error: {
        backgroundColor: theme.palette.error.dark,
        ...baseStyle(theme),
    },
    warning: {
        backgroundColor: amber[700],
        ...baseStyle(theme),
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
        ...baseStyle(theme),
    },
});

const UserErrorMessage = ({ message, classes }) => {
    if (!message) {
        return null;
    }
    const { text, severity } = message;
    let className;
    switch (severity) {
        case 1:
            className = classes.error;
            break;
        case 2:
            className = classes.warning;
            break;
        default:
            className = classes.info;
            break;
    }

    return <Paper className={className}>
        <Typography>{text}</Typography>
    </Paper>
}

UserErrorMessage.propTypes = {
    message: PropTypes
        .shape({
            text: PropTypes.string.isRequired,
            severity: PropTypes.oneOf([1, 2, 3]),
        }),
};

export default withStyles(styles)(UserErrorMessage);