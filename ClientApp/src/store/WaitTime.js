const loadDateRequestType = 'LOAD_DATE';
const loadDateSuccessType = 'LOAD_DATE_SUCCESS';
const loadDateErrorType = 'LOAD_DATE_ERROR';

const selectTimePeriodType = 'SELECT_TIME_PERIOD';

export const loadDate = (slug, date, waitTimeDate = null) => async (dispatch, getState) => {
    const dates = getState().waitTimes[slug];
    if (dates) {
        const waitTimeDate = dates.find(waitTimeDate => waitTimeDate.date.isSame(date));
        if (waitTimeDate) {
            return;
        }
    }

    dispatch({ type: loadDateRequestType, slug, date });

    const loadWaitTimeDate = waitTimeDate => {
        dispatch({ type: loadDateSuccessType, slug, date, waitTimeDate });

        const { timePeriods } = waitTimeDate;
        if (timePeriods.length) {
            const middleIndex = Math.round(timePeriods.length / 2);
            const middleTimestamp = timePeriods[middleIndex].timestamp;
            dispatch(selectTimePeriod(slug, date, middleTimestamp));
        }
    }

    if (waitTimeDate) {
        //loadResort action requesting to load lastDate into store 
        loadWaitTimeDate(waitTimeDate);
    } else {
        try {
            const url = `api/resorts/${slug}/${date.format('YYYY-MM-DD')}`;
            const response = await fetch(url);
            if (response.ok) {
                const waitTimeDate = await response.json();
                loadWaitTimeDate(waitTimeDate);
            } else {
                const { status: code, statusText: error } = response;
                dispatch({ type: loadDateErrorType, slug, date, code, error });
            }
        }
        catch (error) {
            dispatch({ type: loadDateErrorType, slug, date, error });
        }
    }
};

export const selectTimePeriod = (slug, date, timestamp) => (dispatch, getState) => {
    dispatch({ type: selectTimePeriodType, slug, date, timestamp });
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
        const dates = state[action.slug] || [];
        return {
            ...state,
            [action.slug]: dates.map(waitTimeDate => {
                if (waitTimeDate.date.isSame(action.date)) {
                    return {
                        date: action.date,
                        timePeriods: action.waitTimeDate.timePeriods,
                        loading: false,
                    }
                }
                return waitTimeDate;
            })
        };
    }

    if (action.type === loadDateErrorType) {
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
