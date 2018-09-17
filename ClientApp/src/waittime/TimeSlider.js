import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import moment from 'moment';
import { compose } from 'redux';
import withDimensions from 'react-dimensions';

import 'rc-slider/assets/index.css';

import { WaitTimeDateShape } from './types';

const handleStyle = {
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
        containerWidth: PropTypes.number,
    };

    getSliderMarks(timePeriods) {
        /* ********************************************************************************
         * Calculate the marks to display on the slider. Each mark corresponds to a time of 
         * day, and is labeled according to culture.  We display as many marks as will fit,
         * depending on the # of time periods in the wait time date, and the container width.
         * For wide containers, or small # of time periods, we can display a mark for each time
         * period (e.g., every 15 minutes). For small containers or large # of time periods,
         * we display a mark for every x time periods, e.g., every 30 minutes, 45 minutes, etc.
         * *******************************************************************************/
        const { containerWidth } = this.props;
        if (!containerWidth) {
            return null;
        }

        const marksToDisplay = containerWidth / 50; //allow 50px per mark
        const periodsPerMark = Math.ceil(timePeriods.length / marksToDisplay);
        const secondsPerMark = 15 * 60 * periodsPerMark;  //each time period is 15 minutes
        const startSeconds = timePeriods[0].timestamp;

        const timePeriodsToDisplay = periodsPerMark > 1
            //display a mark for every x time periods, e.g., every 30 minutes, 45 minutes, etc.
            ? timePeriods.filter(({ timestamp: seconds }) => (seconds - startSeconds) % secondsPerMark === 0)
            //display a mark for every time period, e.g., every 15 minutes
            : timePeriods;

        return timePeriodsToDisplay.reduce((marks, timePeriod) => {
            marks[timePeriod.timestamp.toString()] = moment.unix(timePeriod.timestamp).utc().format('LT');
            return marks;
        }, {});
    }

    render() {
        const { selectedTimestamp, timePeriods } = this.props.waitTimeDate || {};
        if (!selectedTimestamp || !timePeriods || !timePeriods.length) {
            return null;
        }

        const marks = this.getSliderMarks(timePeriods);
        if (!marks) {
            return null;
        }

        return (
            <div style={containerStyle}>
                <Slider
                    marks={marks}
                    min={timePeriods[0].timestamp}
                    max={timePeriods[timePeriods.length - 1].timestamp}
                    step={15 * 60}
                    included={false}
                    value={selectedTimestamp}
                    onChange={this.props.onSelectTimePeriod}
                    handleStyle={handleStyle}
                />
            </div>
        );
    }
}

export default compose(
    withDimensions({ debounce: 166 }), //10 frames at 60Hz
)(TimeSlider);
