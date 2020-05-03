import axios from 'axios';
import {responseParser} from '../lib/utils'

export const actionsTypes = {
    GET_USERS_DEFAULT_WEATHER_BY_IP: 'GET_USERS_DEFAULT_WEATHER_BY_IP',
};

export const saveUserLocation = (data) => ({
    type: actionsTypes.GET_USERS_DEFAULT_WEATHER_BY_IP,
    payload: data,
});


export const getDefaultUsersWeatherByIp = (lat, lon, city) => async (dispatch) => {

      if (!lat || !lon || !city) {
          const userLocation = await axios.get('http://ip-api.com/json');
          lat = userLocation.data.lat;
          lon = userLocation.data.lon;
          city = userLocation.data.city;
      }

        const userWeather = await axios.get(
            `http://api.worldweatheronline.com/premium/v1/weather.ashx?q=${lat},${lon}4&format=json&num_of_days=7&key=2bf1890821aa4305a1b201204200205`,
        );
        const {data} = userWeather.data;
        const {ClimateAverages, current_condition, request, weather} = data;

        const preparedData = responseParser(ClimateAverages, city, current_condition, request, weather);

        dispatch(saveUserLocation(preparedData));

};
