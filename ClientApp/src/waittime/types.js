import PropTypes from 'prop-types';

const WaitTimeDateFull = {
    date: PropTypes.object.isRequired, //instance of moment, todo: add custom validation
    selectedTimestamp: PropTypes.number.isRequired,
    timePeriods: PropTypes.arrayOf(PropTypes.shape({
        timestamp: PropTypes.number.isRequired,
        waitTimes: PropTypes.arrayOf(PropTypes.shape({
            liftID: PropTypes.number.isRequired,
            seconds: PropTypes.number.isRequired,
        })).isRequired
    })).isRequired,
    loading: PropTypes.bool.isRequired,
};

const WaitTimeDateStub = {
    loading: PropTypes.bool.isRequired,
};

export const WaitTimeDateShape = PropTypes.oneOfType([
    PropTypes.shape(WaitTimeDateFull),
    PropTypes.shape(WaitTimeDateStub)
]);

const ResortStub = {
    loading: PropTypes.bool.isRequired,
};

const ResortFull = {
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    logoFilename: PropTypes.string.isRequired,
    liftCount: PropTypes.number.isRequired,
    hasWaitTimes: PropTypes.bool.isRequired,
    trailMapFilename: PropTypes.string.isRequired,
    dates: PropTypes.arrayOf(PropTypes.object).isRequired,
    lastDate: PropTypes.shape({
        ...WaitTimeDateFull,
        date: PropTypes.string.isRequired,
        loading: undefined,
    }),
    loading: PropTypes.bool.isRequired,
};

export const ResortShape = PropTypes.oneOfType([
    PropTypes.shape(ResortFull),
    PropTypes.shape(ResortStub)
]);
