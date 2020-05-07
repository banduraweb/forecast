import axios from 'axios';
import {
    apiKey,
    apiBaseUrl,
    apiCurentLocation,
    apiCurentLocationHttps,
} from '../lib/api';
import { responseParser } from '../lib/utils';

export const actionsTypes = {
    GET_USERS_FORECAST: 'GET_USERS_FORECAST',
    SET_USER_HISTORY_SEARCH: 'SET_USER_HISTORY_SEARCH',
    SET_RESPONSE_ERROR: 'SET_RESPONSE_ERROR',
};

export const saveUserForecast = (data) => ({
    type: actionsTypes.GET_USERS_FORECAST,
    payload: data,
});

export const setUserHistorySearch = (data) => ({
    type: actionsTypes.SET_USER_HISTORY_SEARCH,
    payload: data,
});

export const setResponseError = () => ({
    type: actionsTypes.SET_RESPONSE_ERROR,
});

export const getUsersForecast = (lat, lon, city) => async (dispatch) => {
    let x = lat;
    let y = lon;
    let town = city;
    if (!lat || !lon || !town) {
        const userLocation = await axios.get(`${apiCurentLocationHttps}`);

        const { loc } = userLocation.data;
        const { region } = userLocation.data;
        const [a, b] = loc.split(',');
        x = a;
        y = b;
        town = region.split(' ')[0];
    }
    try {
        const userWeather = await axios.get(
            `${apiBaseUrl}/weather.ashx?q=${x},${y}&format=json&num_of_days=30&key=${apiKey}`,
        );
        const { data } = userWeather.data;

        const { ClimateAverages, current_condition, request, weather } = data;

        const preparedData = responseParser(
            ClimateAverages,
            town,
            current_condition,
            request,
            weather,
        );

        dispatch(saveUserForecast(preparedData));
    } catch (e) {
        dispatch(setResponseError());
    }
};
