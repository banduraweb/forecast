import { Avatar, Comment } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

export const TodayWeather = ({ currentWeather, city }) => {
    const [current] = currentWeather;
    const {
        FeelsLikeC,
        desc,
        icon,
        temp_C,
        visibility,
        windspeedKmph,
    } = current;
    return (
        <>
            <h1>{city}</h1>
            <Comment
                avatar={<Avatar src={icon} alt="weather" />}
                content={
                    <>
                        <p>
                            Today {desc}, temp: {temp_C}C<sup>0</sup> feels like{' '}
                            {FeelsLikeC}C<sup>0</sup> visibility is {visibility}
                            km and wind speed - {windspeedKmph}km
                        </p>
                    </>
                }
            />
        </>
    );
};

TodayWeather.propTypes = {
    city: PropTypes.string.isRequired,
    currentWeather: PropTypes.arrayOf(
        PropTypes.shape({
            FeelsLikeC: PropTypes.string.isRequired,
            desc: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
            temp_C: PropTypes.string.isRequired,
            visibility: PropTypes.string.isRequired,
            windspeedKmph: PropTypes.string.isRequired,
        }),
    ),
};
