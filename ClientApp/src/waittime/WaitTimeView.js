import React from 'react';
import { connect } from 'react-redux';

import { loadDate, selectTimePeriod } from '../store/WaitTime';
import WaitTimeMap from './WaitTimeMap';
import TimeSlider from './TimeSlider';

class WaitTimeView extends React.Component {
    componentDidMount() {
        this.checkLoadData();
    }

    componentDidUpdate() {
        this.checkLoadData();
    }

    checkLoadData() {
        const { resortSlug, searchDate, waitTimeDate, loadDate } = this.props;
        if (searchDate && !waitTimeDate) {
            loadDate(resortSlug, searchDate);
        }
    }

    handleSelectTimePeriod = timestamp => {
        const { resortSlug, waitTimeDate: { date }, selectTimePeriod } = this.props;
        selectTimePeriod(resortSlug, date, timestamp);
    }

    render() {
        const { resortSlug, searchDate, resort, waitTimeDate } = this.props;
        if (waitTimeDate && waitTimeDate.error) {
            throw new Error(`Error loading ${resortSlug}:${searchDate || '(last)'}: ${waitTimeDate.error} (${waitTimeDate.code})`);
        }
        return (
            <main>
                <div style={{ minHeight: '40px' }}>
                    <TimeSlider waitTimeDate={waitTimeDate} onSelectTimePeriod={this.handleSelectTimePeriod} />
                </div>
                <WaitTimeMap resort={resort} waitTimeDate={waitTimeDate} />
            </main>
        );
    };
}

const mapStateToProps = (state, ownProps) => {
    const { searchDate, resort, resortSlug } = ownProps;
    //use search date if specified, else use the last date for the resort
    const date = searchDate || (resort && resort.lastDate && resort.lastDate.date);
    const waitTimeDate = date
        ? (state.waitTimes[resortSlug] || []).find(waitTimeDate => waitTimeDate.date.isSame(date))
        : { loading: true }; 
    return { waitTimeDate };
};

export default connect(
    mapStateToProps,
    {
        loadDate,
        selectTimePeriod,
    }
)(WaitTimeView);