import { combineReducers } from 'redux';
import { actionsTypes } from './actions';

const loadUserLocation = (state = null, action) => {
    switch (action.type) {
        case actionsTypes.GET_USERS_DEFAULT_WEATHER_BY_IP:
            const { payload } = action;
            return payload;
        default:
            return state;
    }
};

export const rootReducer = combineReducers({
    userIpInfo: loadUserLocation,
});
