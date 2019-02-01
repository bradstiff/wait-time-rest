import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';

import { loadResort } from '../store/Resort';
import { ResortShape } from './types';

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
        flex: auto;
        padding-top: 10px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
`;

class WaitTime extends React.Component {
    static propTypes = {
        slug: PropTypes.string.isRequired,
        date: PropTypes.string,
        resort: ResortShape,
        loadResort: PropTypes.func.isRequired,
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
        if (!resort) {
            return null;
        }

        if (resort.error) {
            if (resort.code === 404) {
                return <ResortNotFound />;
            } else {
                throw new Error(`Error loading ${slug}: ${resort.error} (${resort.code})`);
            }
        }

        const searchDate = searchDateString ? moment(searchDateString) : null;
        const userErrorMessage = resort.loading
            ? null
            : !resort.hasWaitTimes
                ? { text: 'No wait time data exists for the selected resort. Please select either Serre Chevalier Vallee, Steamboat or Winter Park.', severity: 2 }
                : null;

        const date = searchDate ||
            (resort.lastDate
                ? moment(resort.lastDate.date)
                : null);

        return (
            <Flex>
                <WaitTimeNav slug={slug} name={resort.name || 'Loading'} dates={resort.dates} date={date} />
                {!userErrorMessage
                    ? <WaitTimeView slug={slug} resort={resort} searchDate={searchDate} />
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
