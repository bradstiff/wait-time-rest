import React, { Component } from 'react';
import Slider from 'rc-slider';
import moment from 'moment';

import { compose } from 'redux';
import withWidth from '@material-ui/core/withWidth';

import 'rc-slider/assets/index.css';

const handleStyle = {
    borderColor: '#D44126',
};
const containerStyle = {
    padding: '5px 25px 20px 25px',
    overflow: 'hidden',
};

class TimeSlider extends Component {
    render() {
        const { waitTimeDate, onSelectTimePeriod } = this.props;
        if (!waitTimeDate) {
            return null;
        }
        const { timePeriods, selectedTimestamp } = waitTimeDate;
        if (!timePeriods || !timePeriods.length || !selectedTimestamp) {
            return null;
        }

        const timeFormat = 'LT';
        const availableWidth = Math.min(window.innerWidth, 1550) - 50;
        const maxMarks = availableWidth / 50; //~50 pixels per mark
        const periodsPerMarkOptions = [1, 2, 3, 4, 5, 6];
        const periodsPerMark = periodsPerMarkOptions.find(intervalsPerMark => timePeriods.length / maxMarks < intervalsPerMark);
        const minutesPerMark = 15 * periodsPerMark; //each period is 15 minutes; for small screens we have to decrease the granularity

        let minutesAtPreviousMark = 0;
        const endTimePeriod = timePeriods[timePeriods.length - 1];
        const minutesAtEndMark = endTimePeriod.timestamp / 60;
        const marks = timePeriods.reduce((acc, timePeriod) => {
            const minutes = timePeriod.timestamp / 60;
            const makeMark = minutesAtPreviousMark === 0 || // first timeslot
                timePeriod === endTimePeriod || // end timeslot
                (minutes - minutesAtPreviousMark >= minutesPerMark && // at least minutesPerMark gap to previous mark
                    minutesAtEndMark - minutes >= minutesPerMark / 2); // and this mark would not be too close to end mark

            if (makeMark) {
                acc[timePeriod.timestamp.toString()] = moment.unix(timePeriod.timestamp).utc().format(timeFormat);
                minutesAtPreviousMark = minutes;
            }
            return acc;
        }, {});

        return (
            <div style={containerStyle}>
                <Slider
                    marks={marks}
                    min={timePeriods[0].timestamp}
                    max={endTimePeriod.timestamp}
                    step={15 * 60}
                    included={false}
                    value={selectedTimestamp}
                    onChange={onSelectTimePeriod}
                    handleStyle={handleStyle}
                />
            </div>
        );
    }
}

const selectTimePeriodMutation = `
    mutation SelectTimePeriod($waitTimeDateID: String!, $timestamp: Int!) {
        selectTimePeriod(waitTimeDateID: $waitTimeDateID, timestamp: $timestamp) @client
    }
`;

export default compose(
    withWidth(),
)(TimeSlider);
