import Rollbar from 'rollbar';
import moment from 'moment';
import { loadDate } from './WaitTime';

const loadResortsRequestType = 'LOAD_RESORTS';
const loadResortsSuccessType = 'LOAD_RESORTS_SUCCESS';
const loadResortsErrorType = 'LOAD_RESORTS_ERROR';

const loadResortRequestType = 'LOAD_RESORT';
const loadResortSuccessType = 'LOAD_RESORT_SUCCESS';
const loadResortErrorType = 'LOAD_RESORT_ERROR';

export const loadResorts = () => async (dispatch, getState) => {
    if (getState().resorts.all) {
        return;
    }

    dispatch({ type: loadResortsRequestType });

    try {
        const response = await fetch(`/api/resorts`);
        if (response.ok) {
            const resorts = await response.json();
            dispatch({ type: loadResortsSuccessType, resorts });
        } else {
            const { status: code, statusText: error } = response;
            Rollbar.error({ code, error });
            dispatch({ type: loadResortsErrorType, code, error });
        }
    }
    catch (error) {
        Rollbar.error(error);
        dispatch({ type: loadResortsErrorType, error });
    }
};

export const loadResort = slug => async (dispatch, getState) => {
    let resort = getState().resorts[slug];
    if (resort) {
        return;
    }

    dispatch({ type: loadResortRequestType, slug });

    try {
        const response = await fetch('http://httpstat.us/500' || `/api/resorts/${slug}`);
        if (response.ok) {
            resort = await response.json();
            dispatch({ type: loadResortSuccessType, slug, resort });
            if (resort.lastDate) {
                const date = moment(resort.lastDate.date);
                dispatch(loadDate(slug, date, resort.lastDate));
            }
        } else {
            const { status: code, statusText: error } = response;
            Rollbar.error({ code, error });
            dispatch({ type: loadResortErrorType, slug, code, error });
        }
    }
    catch (error) {
        Rollbar.error(error);
        dispatch({ type: loadResortErrorType, slug, error });
    }
};

/* ********************************************************
 * Supports a list of resorts with just a few properties,
 * and an entry for each resort requested indexed by slug, 
 * containing all resort data. Resort entries are stubbed 
 * when requested to suppress re-requesting, and inform
 * the client of requests-in-progress.
 * 
 * state: {
 *      all: [{ slug, name, logoFilename, hasWaitTimeData }],
 *      ['steamboat']: {
 *          id,
 *          name,
 *          trailmapFilename,
 *          dates: [],
 *          loading: false,
 *          ...
 *      },
 *      ['winter-park']: {
 *          loading: true
 *      }
 * }
 * *************************************************************/

export default (state = {}, action) => {
    if (action.type === loadResortsRequestType) {
        return {
            ...state,
        };
    }

    if (action.type === loadResortsSuccessType) {
        return {
            ...state,
            all: action.resorts || [],
        };
    }

    if (action.type === loadResortsErrorType) {
        const { code, error } = action;
        return {
            ...state,
            all: {
                code,
                error,
            }
        }
    }

    if (action.type === loadResortRequestType) {
        return {
            ...state,
            [action.slug]: {
                loading: true,
            }
        };
    }

    if (action.type === loadResortSuccessType) {
        return {
            ...state,
            [action.slug]: {
                ...action.resort,
                dates: action.resort.dates.map(dateString => moment(dateString)),
                loading: false,
            },
        };
    }

    if (action.type === loadResortErrorType) {
        const { code, error } = action;
        return {
            ...state,
            [action.slug]: {
                loading: false,
                code,
                error,
            },
        };
    }

    return state;
};