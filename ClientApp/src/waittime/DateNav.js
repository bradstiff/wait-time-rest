import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import TodayIcon from '@material-ui/icons/Today';
import { withStyles } from '@material-ui/core/styles';

import 'react-datepicker/dist/react-datepicker.css';

const FlexContainer = styled.div`
    ${props => props.style}
    display: flex;
    align-items: center;
    padding: 2px;
`;

const SelectedDate = styled.div`
    flex: auto;
    text-align: center;
    font-weight: 700;
    font-size: 22px;
    color: #D44126;
    text-transform: uppercase;
    border: none;
    font-family: "Gotham A", "Century Gothic", sans-serif;
`;

const styles = {
    iconButton: {
        flex: 'none',
        width: 36,
        height: 36,
        padding: 2,
        color: '#FFF',
        fontSize: 18,
        '&:hover': {
            color: '#D44126',
            cursor: 'pointer',
        }
    }
}

const DateNav = ({ dates, date, displayFormat, style, selectDate, classes }) => {
    if (!dates) {
        return null;
    }

    const selectedDateDisplay = dates.length === 0 ? 'NO DATES AVAILABLE' :
        date === null ? '' :
            date.format(displayFormat);

    const selectedDateIndex = dates.findIndex(d => d.isSame(date));

    const nextDateIndex = selectedDateIndex + 1;
    const nextDate = nextDateIndex > 0 && nextDateIndex < dates.length ?
        dates[nextDateIndex] :
        null;

    const previousDateIndex = selectedDateIndex - 1;
    const previousDate = previousDateIndex >= 0 ?
        dates[previousDateIndex] :
        null;

    const makeScrollDateHandler = date => {
        return date ?
            () => selectDate(date) :
            null;
    };

    return (
        <FlexContainer style={style}>
            <div><IconButton onClick={makeScrollDateHandler(previousDate)} className={classes.iconButton}>
                <ChevronLeftIcon />
            </IconButton></div>
            <SelectedDate>{selectedDateDisplay}</SelectedDate>
            <DatePicker
                includeDates={dates}
                selected={date && date.isValid() ? date : null}
                onChange={selectDate}
                className={classes.iconButton}
                customInput={<IconButton className={classes.iconButton}><TodayIcon /></IconButton>}
                popperPlacement='bottom-end'
            />
            <IconButton onClick={makeScrollDateHandler(nextDate)} className={classes.iconButton}>
                <ChevronRightIcon />
            </IconButton>
        </FlexContainer>
    );
};

DateNav.propTypes = {
    dates: PropTypes.arrayOf(PropTypes.object),
    date: PropTypes.object,
    displayFormat: PropTypes.string.isRequired,
    selectDate: PropTypes.func.isRequired,
};

export default withStyles(styles)(DateNav);