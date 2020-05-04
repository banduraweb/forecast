import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, Avatar, Tag } from 'antd';

const { Title, Paragraph } = Typography;

export const ListingWeatherCard = ({ card }) => {
    const {
        astronomy,
        avgtempC,
        date,
        maxtempC,
        mintempC,
        sunHour,
        hourly,
    } = card;
    const { weatherIconUrl, weatherDesc } = hourly[3];
    const [icon] = weatherIconUrl;
    const [desc] = weatherDesc;

    const { moonrise, moonset, sunrise, sunset } = astronomy;
    const currentDay = new Date(date);

    return (
        <Card>
            <Avatar src={icon.value} alt="weather" />
            <div className="listing-card__details">
                <div className="listing-card__description">
                    <Title level={4} className="listing-card__price">
                        <div>{currentDay.toDateString().slice(0, 3)}</div>
                        <div>{date}</div>
                        <Paragraph>
                            avgtempC: {avgtempC} C<sup>0</sup>
                        </Paragraph>
                    </Title>
                    <div className="listing-day-weather-desc">
                        <Tag color="success">{desc.value}</Tag>
                        <Tag color="warning">
                            maxtempC: {maxtempC} C<sup>0</sup>
                        </Tag>
                        <Tag color="processing">
                            mintempC: {mintempC} C<sup>0</sup>
                        </Tag>
                        <Tag color="orange">sunHour: {sunHour}</Tag>
                        <Tag color="gold">sunrise: {sunrise}</Tag>
                        <Tag color="#8c8c8c">sunset: {sunset}</Tag>
                        <Tag color="cyan">moonrise: {moonrise}</Tag>
                        <Tag color="default">moonset: {moonset}</Tag>
                    </div>
                </div>
            </div>
        </Card>
    );
};
ListingWeatherCard.propTypes = {
    card: PropTypes.shape({
        hourly: PropTypes.arrayOf(
            PropTypes.shape({
                DewPointC: PropTypes.string.isRequired,
                DewPointF: PropTypes.string.isRequired,
                FeelsLikeC: PropTypes.string.isRequired,
                FeelsLikeF: PropTypes.string.isRequired,
                HeatIndexC: PropTypes.string.isRequired,
                HeatIndexF: PropTypes.string.isRequired,
                WindChillC: PropTypes.string.isRequired,
                WindChillF: PropTypes.string.isRequired,
                WindGustKmph: PropTypes.string.isRequired,
                WindGustMiles: PropTypes.string.isRequired,
                chanceoffog: PropTypes.string.isRequired,
                chanceoffrost: PropTypes.string.isRequired,
                chanceofhightemp: PropTypes.string.isRequired,
                chanceofovercast: PropTypes.string.isRequired,
                chanceofrain: PropTypes.string.isRequired,
                chanceofremdry: PropTypes.string.isRequired,
                chanceofsnow: PropTypes.string.isRequired,
                chanceofsunshine: PropTypes.string.isRequired,
                chanceofthunder: PropTypes.string.isRequired,
                chanceofwindy: PropTypes.string.isRequired,
                cloudcover: PropTypes.string.isRequired,
                humidity: PropTypes.string.isRequired,
                precipInches: PropTypes.string.isRequired,
                precipMM: PropTypes.string.isRequired,
                pressure: PropTypes.string.isRequired,
                pressureInches: PropTypes.string.isRequired,
                tempC: PropTypes.string.isRequired,
                tempF: PropTypes.string.isRequired,
                time: PropTypes.string.isRequired,
                uvIndex: PropTypes.string.isRequired,
                visibility: PropTypes.string.isRequired,
                visibilityMiles: PropTypes.string.isRequired,
                weatherCode: PropTypes.string.isRequired,
                winddir16Point: PropTypes.string.isRequired,
                winddirDegree: PropTypes.string.isRequired,
                windspeedKmph: PropTypes.string.isRequired,
                windspeedMiles: PropTypes.string.isRequired,
                weatherDesc: PropTypes.arrayOf(
                    PropTypes.shape({
                        value: PropTypes.string.isRequired,
                    }),
                ),
                weatherIconUrl: PropTypes.arrayOf(
                    PropTypes.shape({
                        value: PropTypes.string.isRequired,
                    }),
                ),
            }),
        ).isRequired,
        avgtempC: PropTypes.string,
        date: PropTypes.string,
        maxtempC: PropTypes.string,
        mintempC: PropTypes.string,
        sunHour: PropTypes.string,
        astronomy: PropTypes.shape({
            moonrise: PropTypes.string.isRequired,
            moonset: PropTypes.string.isRequired,
            sunrise: PropTypes.string.isRequired,
            sunset: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};
