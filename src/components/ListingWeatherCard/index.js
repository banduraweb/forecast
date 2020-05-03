import React from 'react';
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
