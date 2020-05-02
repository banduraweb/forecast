import axios from 'axios';

export const actionsTypes = {
    GET_USERS_DEFAULT_WEATHER_BY_IP: 'GET_USERS_DEFAULT_WEATHER_BY_IP',
};

export const saveUserLocation = (data) => ({
    type: actionsTypes.GET_USERS_DEFAULT_WEATHER_BY_IP,
    payload: data,
});

export const getDefaultUsersWeatherByIp = () => async (dispatch) => {
    try {
        const userLocation = await axios.get('http://ip-api.com/json');
        const { city, countryCode, lat, lon } = userLocation.data;

        // const userWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode.toLowerCase()}&units=metric&APPID=b25cb1dac8465227f4d2f1bdc6e9a5c7&lang=${countryCode.toLowerCase()}`);
        const userWeather = await axios.get(
            `http://api.worldweatheronline.com/premium/v1/weather.ashx?q=${lat},${lon}4&format=json&num_of_days=5&key=2bf1890821aa4305a1b201204200205`,
        );

        dispatch(saveUserLocation(userWeather.data));
    } catch (e) {
        console.log(e);
    }
};
