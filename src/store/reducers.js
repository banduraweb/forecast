import { combineReducers } from 'redux';
import { actionsTypes } from './actions';

const loadUserLocation = (state = null, action) => {
    switch (action.type) {
        case actionsTypes.GET_USERS_FORECAST:
            const { payload } = action;
            return payload;
        default:
            return state;
    }
};

const loadUserHistorySearch = (state = [], action) => {
    switch (action.type) {
        case actionsTypes.SET_USER_HISTORY_SEARCH:
            const { payload } = action;
            if (state.length > 4) {
                state.shift();
            }
            if (
                state.find(
                    ({ lat, lng }) =>
                        lat === payload.lat && lng === payload.lng,
                )
            ) {
                return state;
            }
            return [...state, payload];
        default:
            return state;
    }
};

export const rootReducer = combineReducers({
    usersQueriedForecast: loadUserLocation,
    userHistorySearch: loadUserHistorySearch,
});
