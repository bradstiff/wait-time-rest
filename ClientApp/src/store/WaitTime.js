import Rollbar from 'rollbar';
import moment from 'moment';

import { loadResortSuccessType } from './Resort';

const loadDateRequestType = 'LOAD_DATE';
const loadDateSuccessType = 'LOAD_DATE_SUCCESS';
const loadDateFailureType = 'LOAD_DATE_FAILURE';

const selectTimePeriodType = 'SELECT_TIME_PERIOD';

export const loadDate = (slug, date) => async (dispatch, getState) => {
    const dates = getState().waitTimes[slug];
    if (dates) {
        const waitTimeDate = dates.find(waitTimeDate => waitTimeDate.date.isSame(date));
        if (waitTimeDate) {
            return;
        }
    }

    dispatch({ type: loadDateRequestType, slug, date });

    try {
        const response = await fetch(`/api/waitTimes/${slug}/${date.format('YYYY-MM-DD')}`);
        if (response.ok) {
            const waitTimeDate = await response.json();
            dispatch({ type: loadDateSuccessType, slug, date, waitTimeDate });
        } else {
            const { status: code, statusText: error } = response;
            Rollbar.error({ code, error });
            dispatch({ type: loadDateFailureType, slug, date, code, error });
        }
    }
    catch (error) {
        Rollbar.error(error);
        dispatch({ type: loadDateFailureType, slug, date, error });
    }
};

export const selectTimePeriod = (slug, date, timestamp) => (dispatch, getState) => {
    dispatch({ type: selectTimePeriodType, slug, date, timestamp });
};

const getMiddleTimestamp = waitTimeDate => {
    const { timePeriods } = waitTimeDate || {};
    if (!timePeriods || !timePeriods.length) {
        return null;
    }
    const middleIndex = timePeriods.length > 1
        ? Math.round(timePeriods.length / 2)
        : 0;
    return timePeriods[middleIndex].timestamp;
};

export default (state = {}, action) => {
    if (action.type === loadDateRequestType) {
        const dates = (state[action.slug] || []).slice();
        dates.push({
            date: action.date,
            loading: true
        });
        return {
            ...state,
            [action.slug]: dates,
        };
    }

    if (action.type === loadDateSuccessType) {
        const { slug, date, waitTimeDate: fetchedWaitTimeDate } = action;
        const dates = state[slug] || [];
        const newDates = dates.map(waitTimeDate => {
            if (waitTimeDate.date.isSame(date)) {
                return {
                    ...fetchedWaitTimeDate,
                    date,
                    selectedTimestamp: getMiddleTimestamp(fetchedWaitTimeDate),
                    loading: false,
                };
            }
            return waitTimeDate;
        });
        return {
            ...state,
            [slug]: newDates
        };
    }

    if (action.type === loadResortSuccessType) {
        //copy resort.lastDate into waitTime state, from where it will be accessed.
        const { lastDate: lastWaitTimeDate, slug } = action.resort;

        if (!lastWaitTimeDate) {
            return state;
        }

        const dates = state[slug] || [];
        const newDates = dates.slice();
        newDates.push({
            ...lastWaitTimeDate,
            date: moment(lastWaitTimeDate.date),
            selectedTimestamp: getMiddleTimestamp(lastWaitTimeDate),
            loading: false,
        });
        return {
            ...state,
            [slug]: newDates,
        };
    }

    if (action.type === loadDateFailureType) {
        const dates = state[action.slug] || [];
        return {
            ...state,
            [action.slug]: dates.map(waitTimeDate => {
                if (waitTimeDate.date.isSame(action.date)) {
                    return {
                        ...waitTimeDate,
                        loading: false,
                        code: action.code,
                        error: action.error,
                    }
                }
                return waitTimeDate;
            })
        };
    }

    if (action.type === selectTimePeriodType) {
        const dates = state[action.slug] || [];
        return {
            ...state,
            [action.slug]: dates.map(waitTimeDate => {
                if (waitTimeDate.date.isSame(action.date)) {
                    return {
                        ...waitTimeDate,
                        selectedTimestamp: action.timestamp,
                    }
                }
                return waitTimeDate;
            })
        };
    }

    return state;
};
