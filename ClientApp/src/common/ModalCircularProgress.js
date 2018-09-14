import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
    modal: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    animationContainer: {
        flex: 'auto',
        textAlign: 'center',
        outline: 'none',
    },
    progress: {
        margin: 16,
    }
};

const ModalCircularProgress = ({ open }) => (
    <Modal open={open} style={styles.modal}>
        <div style={styles.animationContainer}>
            <CircularProgress style={styles.progress} color='secondary' />
        </div>
    </Modal>
);

ModalCircularProgress.propTypes = {
    open: PropTypes.bool.isRequired,
}

export default ModalCircularProgress;