import moment from 'moment';
import { loadDate } from './WaitTime';

const loadResortsRequestType = 'LOAD_RESORTS';
const loadResortsSuccessType = 'LOAD_RESORTS_SUCCESS';

const loadResortRequestType = 'LOAD_RESORT';
const loadResortSuccessType = 'LOAD_RESORT_SUCCESS';
const loadResortErrorType = 'LOAD_RESORT_ERROR';

export const loadResorts = () => async (dispatch, getState) => {
    if (getState().resorts.all) {
        return;
    }

    dispatch({ type: loadResortsRequestType });

    const url = `api/resorts`;
    const response = await fetch(url);
    const resorts = await response.json();

    dispatch({ type: loadResortsSuccessType, resorts });
};

export const loadResort = slug => async (dispatch, getState) => {
    let resort = getState().resorts[slug];
    if (resort) {
        return;
    }

    dispatch({ type: loadResortRequestType, slug });

    try {
        const url = `api/resorts/${slug}`;
        const response = await fetch(url);
        if (response.ok) {
            resort = await response.json();
            dispatch({ type: loadResortSuccessType, slug, resort });
            if (resort.lastDate) {
                const date = moment(resort.lastDate.date);
                dispatch(loadDate(slug, date, resort.lastDate));
            }
        } else {
            const { status: code, statusText: error } = response;
            dispatch({ type: loadResortErrorType, slug, code, error });
        }
    }
    catch (error) {
        dispatch({ type: loadResortErrorType, slug, error });
    }
};

/* ********************************************************
 * Supports a list of resorts with just a few properties,
 * and a property for each resort viewed indexed by slug, 
 * containing all resort data, e.g.,
 * 
 * state: {
 *      resortList: [{ slug, name, logoFilename, hasWaitTimeData }],
 *      ['steamboat']: {
 *          id,
 *          name,
 *          trailmapFilename,
 *          dates: [],
 *          ...
 *      },
 *      ['winter-park']: {
 *          ...
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
        return {
            ...state,
            [action.slug]: {
                loading: false,
                code: action.code,
                error: action.error,
            },
        };
    }

    return state;
};