import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersForecast } from '../../store/actions';
import {
    PageSkeleton,
    ListingWeatherCard,
    TodayWeather,
} from '../../components';
import { List } from 'antd';

export const MonthForecast = () => {
    const userIpInfo = useSelector((state) => state.usersQueriedForecast);
    const dispatch = useDispatch();
    const [page, setListingsPage] = useState(1);

    useEffect(() => {
        if (!userIpInfo) {
            dispatch(getUsersForecast());
        }
    }, [dispatch]);

    const monthForecast = userIpInfo ? (
        <>
            <h1 style={{ float: 'right' }}>Month Forecast</h1>
            <TodayWeather
                city={userIpInfo.city}
                currentWeather={userIpInfo.condition_current}
            />
            <List
                grid={{
                    gutter: 8,
                    xs: 1,
                    sm: 2,
                    lg: 4,
                }}
                dataSource={userIpInfo.weatherForecast}
                pagination={{
                    position: 'top',
                    current: page,
                    total: 14,
                    defaultPageSize: 5,
                    hideOnSinglePage: true,
                    showLessItems: true,
                    onChange: (page) => setListingsPage(page),
                }}
                renderItem={(userLCard) => (
                    <List.Item>
                        <ListingWeatherCard card={userLCard} />
                    </List.Item>
                )}
            />
        </>
    ) : (
        <PageSkeleton />
    );

    return <div className="listing-weather">{monthForecast}</div>;
};
