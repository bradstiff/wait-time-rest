import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';

import { loadResort } from '../store/Resort';

import UserErrorMessage from '../common/UserErrorMessage';
import WaitTimeNav from './WaitTimeNav';
import WaitTimeView from './WaitTimeView';
import ResortNotFound from '../app/ResortNotFound';

const Flex = styled.div`
    height: 100vh;
    display: flex;
    flex-flow: column;
    max-width: 1550px;
    margin: auto;
    background-color: #222;

    > header {
        flex: none;
    }

    > main {
        padding-top: 10px;
        flex: auto;
        overflow: hidden;
    }
`;

class WaitTime extends React.Component {
    static propTypes = {
        slug: PropTypes.string.isRequired,
        date: PropTypes.string,
        resort: PropTypes.object,
    };

    componentDidMount() {
        this.checkLoadData();
    }

    componentDidUpdate() {
        this.checkLoadData();
    }

    checkLoadData() {
        const { slug, resort, loadResort } = this.props;
        if (!resort) {
            loadResort(slug);
        }
    }

    render() {
        const { slug, date: searchDateString, resort } = this.props;
        if (resort && resort.error) {
            if (resort.code === 404) {
                return <ResortNotFound />;
            } else {
                throw new Error(`Error loading ${slug}: ${resort.error} (${resort.code})`);
            }
        }

        const searchDate = searchDateString ? moment(searchDateString) : null;
        const date = searchDate ||
            (resort && resort.lastDate
                ? moment(resort.lastDate.date)
                : null);

        const userErrorMessage = !resort || resort.loading
            ? null //loading
            : !resort.dates.length
                ? { text: 'No wait time data exists for the selected resort. Please select either Serre Chevalier Vallee, Steamboat or Winter Park.', severity: 2 }
                : searchDate && !resort.dates.find(date => date.isSame(searchDate))
                    ? { text: 'No wait time data exists for the selected date. Please select a date from the calendar.', severity: 2 }
                    : null;

        return (
            <Flex>
                <WaitTimeNav resortSlug={slug} resort={resort} date={date} />
                {!userErrorMessage
                    ? <WaitTimeView resortSlug={slug} resort={resort} searchDate={searchDate} />
                    : <UserErrorMessage message={userErrorMessage} />
                }
            </Flex>
        );
    }
}

export default connect(
    (state, ownProps) => ({ resort: state.resorts[ownProps.slug] }),
    { loadResort }
)(WaitTime);
