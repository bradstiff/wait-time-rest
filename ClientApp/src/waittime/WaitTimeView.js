import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { loadDate, selectTimePeriod } from '../store/WaitTime';

import { ResortShape, WaitTimeDateShape } from './types';
import WaitTimeMap from './WaitTimeMap';
import TimeSlider from './TimeSlider';
import UserErrorMessage from '../common/UserErrorMessage';

const timeSliderContainerStyle = {
    minHeight: 40,
};

class WaitTimeView extends React.Component {
    static propTypes = {
        slug: PropTypes.string.isRequired,
        searchDate: PropTypes.object,
        resort: ResortShape.isRequired,
        waitTimeDate: WaitTimeDateShape,
        loadDate: PropTypes.func.isRequired,
        selectTimePeriod: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.checkLoadData();
    }

    componentDidUpdate() {
        this.checkLoadData();
    }

    checkLoadData() {
        const { slug, searchDate, waitTimeDate, loadDate } = this.props;
        if (searchDate && !waitTimeDate) {
            loadDate(slug, searchDate);
        }
    }

    handleSelectTimePeriod = timestamp => {
        const { slug, waitTimeDate: { date }, selectTimePeriod } = this.props;
        selectTimePeriod(slug, date, timestamp);
    }

    render() {
        const { slug, searchDate, resort, waitTimeDate } = this.props;
        if (waitTimeDate && waitTimeDate.error) {
            if (waitTimeDate.code === 404) {
                return <UserErrorMessage message={{ text: 'No wait time data exists for the selected date. Please select a date from the calendar.', severity: 2 }} />;
            }
            else {
                throw new Error(`Error loading ${slug}:${searchDate || '(last)'}: ${waitTimeDate.error} (${waitTimeDate.code})`);
            }
        }

        return (
            <main>
                <div style={timeSliderContainerStyle}>
                    <TimeSlider waitTimeDate={waitTimeDate} onSelectTimePeriod={this.handleSelectTimePeriod} />
                </div>
                <WaitTimeMap trailMapFilename={resort.trailMapFilename} waitTimeDate={waitTimeDate} />
            </main>
        );
    };
}

const mapStateToProps = (state, ownProps) => {
    const { searchDate, resort, slug } = ownProps;
    const waitTimes = state.waitTimes[slug] || [];
    //use search date if specified, else use the last date for the resort
    const date = searchDate ||
        (resort.lastDate
            ? moment(resort.lastDate.date)
            : null);
    const waitTimeDate = date
        ? waitTimes.find(waitTimeDate => waitTimeDate.date.isSame(date))
        : {
            loading: true
        }; 
    return { waitTimeDate };
};

export default connect(
    mapStateToProps,
    {
        loadDate,
        selectTimePeriod,
    }
)(WaitTimeView);