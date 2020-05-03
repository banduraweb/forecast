import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageSkeleton } from '../../../../components';
import { List } from 'antd';
import { getDefaultUsersWeatherByIp } from '../../../../store/actions';
import { ListingWeatherCard, TodayWeather, YearChartsTemp } from '../../../../components';

export const ListingWeather = () => {
	const userIpInfo = useSelector((state) => state.userIpInfo);

	const dispatch = useDispatch();
	useEffect(() => {
		if (!userIpInfo) {
			dispatch(getDefaultUsersWeatherByIp());
		}
	}, []);


	const listingWeather = userIpInfo ? (
		<>
			<TodayWeather city={userIpInfo.city} currentWeather={userIpInfo.condition_current} />
		<List
			grid={{
				gutter: 8,
				xs: 1,
				sm: 2,
				lg: 4
			}}
			dataSource={userIpInfo.weatherForecast.slice(0,5)}

			renderItem={userLCard => (
				<List.Item>
					<ListingWeatherCard card={userLCard}/>
				</List.Item>
			)}
		/>
			<YearChartsTemp temp={userIpInfo.averageTempByMonth} city={userIpInfo.city}/>
		</>
	) : <PageSkeleton/>;

	return (<div className="listing-weather">

		{listingWeather}
	</div>);
};
