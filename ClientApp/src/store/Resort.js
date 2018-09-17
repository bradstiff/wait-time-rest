import Rollbar from 'rollbar';
import moment from 'moment';

const loadResortsRequestType = 'LOAD_RESORTS';
const loadResortsSuccessType = 'LOAD_RESORTS_SUCCESS';
const loadResortsFailureType = 'LOAD_RESORTS_FAILURE';

const loadResortRequestType = 'LOAD_RESORT';
export const loadResortSuccessType = 'LOAD_RESORT_SUCCESS';
const loadResortFailureType = 'LOAD_RESORT_FAILURE';

/* ********************************************************
 * Supports a list of resorts with just a few properties,
 * and an entry for each resort requested, indexed by slug, 
 * and containing all resort data.  E.g.,
 *
 * state: {
 *      all: [{ slug, name, logoFilename, hasWaitTimeData }, ...],
 *      ['winter-park']: {
 *          loading: true
 *      },
 *      ['steamboat']: {
 *          loading: false,
 *          id,
 *          name,
 *          trailmapFilename,
 *          dates: [],
 *          lastDate,
 *          ...
 *      },
 * }
 *
 * UI optimistically attempts to retrieve resort entry from state
 * via mapStateToProps.  When resort prop is falsy, UI dispatches 
 * load action, which creates a stub that the UI subsequently 
 * retrieves. The stub has loading: true, which the UI 
 * observes. The stub prevents the UI from dispatching multiple 
 * load actions. The stub also enables the action to suppress 
 * refetching. Finally, the stub supports error codes, including 404.
 * 
 * When the fetch resolves, the stub is replaced with the full object.
 * *************************************************************/

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
            dispatch({ type: loadResortsFailureType, code, error });
        }
    }
    catch (error) {
        Rollbar.error(error);
        dispatch({ type: loadResortsFailureType, error });
    }
};

export const loadResort = slug => async (dispatch, getState) => {
    let resort = getState().resorts[slug];
    if (resort) {
        return;
    }

    dispatch({ type: loadResortRequestType, slug });

    try {
        const response = await fetch(`/api/resorts/${slug}`);
        if (response.ok) {
            resort = await response.json();
            dispatch({ type: loadResortSuccessType, slug, resort });
        } else {
            const { status: code, statusText: error } = response;
            Rollbar.error({ code, error });
            dispatch({ type: loadResortFailureType, slug, code, error });
        }
    }
    catch (error) {
        Rollbar.error(error);
        dispatch({ type: loadResortFailureType, slug, error });
    }
};

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

    if (action.type === loadResortsFailureType) {
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

    if (action.type === loadResortFailureType) {
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