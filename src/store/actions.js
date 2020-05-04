import axios from 'axios';
import { apiKey, apiBaseUrl, apiCurentLocation } from '../lib/api';
import { responseParser } from '../lib/utils';

export const actionsTypes = {
    GET_USERS_FORECAST: 'GET_USERS_FORECAST',
    SET_USER_HISTORY_SEARCH: 'SET_USER_HISTORY_SEARCH',
    SET_RESPONSE_ERROR: 'SET_RESPONSE_ERROR',
};

export const saveUserLocation = (data) => ({
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
    if (!lat || !lon || !city) {
      //  const userLocation = await axios.get(`${apiCurentLocation}`);
      //   lat = userLocation.data.lat;
      //   lon = userLocation.data.lon;
      //   city = userLocation.data.city;
        lat = 50.4543;
        lon = 30.5251;
        city = "Kyiv";
        // console.log(lat, lon);
        // 50.4543 30.5251
    }
    try {
        const userWeather = await axios.get(
            `${apiBaseUrl}/weather.ashx?q=${lat},${lon}&format=json&num_of_days=30&key=${apiKey}`,
        );
        const { data } = userWeather.data;

        const { ClimateAverages, current_condition, request, weather } = data;

        const preparedData = responseParser(
            ClimateAverages,
            city,
            current_condition,
            request,
            weather,
        );
        dispatch(saveUserLocation(preparedData));
    } catch (e) {
        dispatch(setResponseError());
    }
};
