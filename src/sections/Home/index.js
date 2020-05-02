import React, { useEffect } from 'react';
import { getDefaultUsersWeatherByIp } from '../../store/actions';
import { PageSkeleton } from '../../components';
import { useDispatch, useSelector } from 'react-redux';

export const Home = () => {
    const userIpInfo = useSelector((state) => state.userIpInfo);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDefaultUsersWeatherByIp());
    }, []);
    console.log(userIpInfo);
    const userCurrentWeather = userIpInfo ? (
        <div className="app-header__user-info">loaded</div>
    ) : (
        <div>
            <PageSkeleton />
        </div>
    );

    return <div>{userCurrentWeather}</div>;
};
