

const ConvertTempFromFtoC = (temp) => ((Number(temp) - 32) * 5 / 9).toFixed(1);



export const responseParser = (ClimateAverages, city, current_condition, request, weather)=>{

	const  [yearTemp]= ClimateAverages;
	const {month} = yearTemp;

	const averageTempByMonth = month.map(({ absMaxTemp_F, avgMinTemp_F, name, index }) => {
		return {
			averageMaxTem: ConvertTempFromFtoC(absMaxTemp_F),
			averageMinTem: ConvertTempFromFtoC(avgMinTemp_F),
			name,
			index
		};
	})


	const condition_current = current_condition.map(({temp_C, FeelsLikeC, visibility, windspeedKmph, weatherDesc, weatherIconUrl})=>{
		const [weatherIcon] = weatherIconUrl;
		const [weatherDescription] = weatherDesc;
		return {
			temp_C,
			FeelsLikeC,
			visibility,
			windspeedKmph,
			icon: weatherIcon.value,
			desc: weatherDescription.value
		}
	});


	const current_coordinates = request.map(({query})=>{
		return {
			query
		}
	});

	const weatherForecast = weather.map(({ astronomy, avgtempC, date, maxtempC, mintempC, sunHour }) => {
		const [sunSetRise] = astronomy;
		const {moonrise, moonset, sunrise, sunset} = sunSetRise;
		return {
			date,
			avgtempC,
			maxtempC,
			mintempC,
			sunHour,
			astronomy: {moonrise, moonset, sunrise, sunset}

		};
	});


	return {
		averageTempByMonth,
		condition_current,
		current_coordinates,
		weatherForecast
	}
};