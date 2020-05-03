import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDefaultUsersWeatherByIp } from '../../store/actions';
import { PageSkeleton, ListingWeatherCard, TodayWeather } from '../../components';
import { List } from 'antd';

export const MonthForecast = () => {

    const userIpInfo = useSelector((state) => state.userIpInfo);
    const dispatch = useDispatch();
    const [page, setListingsPage] = useState(1);


    console.log(userIpInfo, 'userIpInfo');

    useEffect(() => {
        if (!userIpInfo) {
            dispatch(getDefaultUsersWeatherByIp());
        }
    }, []);


    const monthForecast = userIpInfo ? (
      <>
          <TodayWeather city={userIpInfo.city} currentWeather={userIpInfo.condition_current} />
          <List
        grid={{
            gutter: 8,
            xs: 1,
            sm: 2,
            lg: 4
        }}
        dataSource={userIpInfo.weatherForecast}
        pagination={{
            position: "top",
            current: page,
            total : 14,
            defaultPageSize: 5,
            hideOnSinglePage: true,
            showLessItems: true,
            onChange: (page) => setListingsPage(page)
        }}
        renderItem={userLCard => (
          <List.Item>
              <ListingWeatherCard card={userLCard}/>
          </List.Item>
        )}
      />
      </>
    ) : (
      <PageSkeleton/>
    );




    return (
      <div className="listing-weather">
          {monthForecast}
          </div>
    );
};
