import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import moment from 'moment';
import { compose } from 'redux';
import withWidth from '@material-ui/core/withWidth';

import 'rc-slider/assets/index.css';

import { WaitTimeDateShape } from './types';

const dragHandleStyle = {
    borderColor: '#D44126',
};
const containerStyle = {
    padding: '5px 25px 20px 25px',
    overflow: 'hidden',
};

class TimeSlider extends React.Component {
    static propTypes = {
        waitTimeDate: WaitTimeDateShape,
        onSelectTimePeriod: PropTypes.func,
    };

    get hasWaitTimeDate() {
        const { selectedTimestamp, timePeriods } = this.props.waitTimeDate || {};
        return !!(selectedTimestamp && timePeriods && timePeriods.length);
    }

    setContainerRef = ref => {
        this.container = ref;
    }

    componentDidMount() {
        if (this.hasWaitTimeDate) {
            //received data before DOM; re-render as marks depend on container dimensions
            //should never happen
            this.forceUpdate();
        }
    }

    getSliderValues() {
        /* ********************************************************************************
         * Calculate the marks to display on the slider. Each mark corresponds to a time of 
         * day, and is labeled according to culture.  We display as many marks as will fit,
         * depending on the # of time periods in the wait time date, and the container width.
         * For wide containers, or small # of time periods, we can display a mark for each time
         * period (e.g., every 15 minutes). For small containers or large # of time periods,
         * we display a mark for every x time periods, e.g., every 30 minutes, 45 minutes, etc.
         * *******************************************************************************/
        if (!this.container ||
            !this.container.clientWidth ||
            !this.hasWaitTimeDate) {
            return {};
        }

        const containerWidth = this.container.clientWidth;
        const { waitTimeDate: { timePeriods, selectedTimestamp }} = this.props;

        const secondsPerPeriod = 15 * 60; //each time period is 15 minutes
        const marksToDisplay = containerWidth / 50; //allow 50px per mark
        const periodsPerMark = Math.ceil(timePeriods.length / marksToDisplay);
        const secondsPerMark = secondsPerPeriod * periodsPerMark;  
        const startSeconds = timePeriods[0].timestamp;

        const timePeriodsToDisplay = periodsPerMark > 1
            //display a mark for every x time periods, e.g., every 30 minutes, 45 minutes, etc.
            ? timePeriods.filter(({ timestamp: seconds }) => (seconds - startSeconds) % secondsPerMark === 0)
            //display a mark for every time period, e.g., every 15 minutes
            : timePeriods;

        const marks = timePeriodsToDisplay.reduce((marks, timePeriod) => {
            marks[timePeriod.timestamp.toString()] = moment.unix(timePeriod.timestamp).utc().format('LT');
            return marks;
        }, {});

        return {
            value: selectedTimestamp,
            marks,
            min: startSeconds,
            max: timePeriodsToDisplay[timePeriodsToDisplay.length - 1].timestamp,
            step: secondsPerPeriod,
        }
    }

    render() {
        const { value, marks, min, max, step } = this.getSliderValues();
        const { onSelectTimePeriod } = this.props;
        return (
            <div style={containerStyle} ref={this.setContainerRef}>
                {
                    this.hasWaitTimeDate
                        ? <Slider
                            value={value}
                            marks={marks}
                            min={min}
                            max={max}
                            step={step}
                            included={false}
                            onChange={onSelectTimePeriod}
                            handleStyle={dragHandleStyle} />
                        : null
                }
            </div>
        );
    }
}

export default compose(
    withWidth(), //updates on window resize
)(TimeSlider);
