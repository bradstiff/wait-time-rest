import React from 'react';
import PropTypes from 'prop-types';
import Rollbar from 'rollbar';

class ErrorBoundary extends React.Component {
    state = {
        hasError: false,
    };

    componentDidCatch(error, info) {
        Rollbar.error(error, info);
        this.setState({ hasError: true });
    }

    render() {
        const { hasError } = this.state;
        const { children, component } = this.props;
        return hasError
            ? React.createElement(component)
            : children;
    }

    static propTypes = {
        component: PropTypes.func,
        children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    }
}

export default ErrorBoundary;