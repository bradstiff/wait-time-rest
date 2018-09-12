import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const Error = ({ message }) => (
    <div style={{minHeight: '100vh'}}>
        <Paper style={{ padding: 10, maxWidth: 1250 }}>
            <Typography paragraph variant='display1'>Whoops</Typography>
            <Typography paragraph>{message}</Typography>
        </Paper>
    </div>
);

Error.defaultProps = {
    message: "That's an error. It's our fault; we're on it. Please wait a bit and try again.",
}

Error.propTypes = {
    message: PropTypes.string,
}

export default Error;