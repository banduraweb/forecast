const ConvertTempFromFtoC = (temp) =>
    (((Number(temp) - 32) * 5) / 9).toFixed(1);

export const responseParser = (
    ClimateAverages,
    city,
    current_condition,
    request,
    weather,
) => {
    const [yearTemp] = ClimateAverages;
    const { month } = yearTemp;

    const averageTempByMonth = month.map(
        ({ absMaxTemp_F, avgMinTemp_F, name }) => {
            return {
                averageMaxTem: ConvertTempFromFtoC(absMaxTemp_F),
                averageMinTem: ConvertTempFromFtoC(avgMinTemp_F),
                name,
            };
        },
    );

    const condition_current = current_condition.map(
        ({
            temp_C,
            FeelsLikeC,
            visibility,
            windspeedKmph,
            weatherDesc,
            weatherIconUrl,
        }) => {
            const [weatherIcon] = weatherIconUrl;
            const [weatherDescription] = weatherDesc;
            return {
                temp_C,
                FeelsLikeC,
                visibility,
                windspeedKmph,
                icon: weatherIcon.value,
                desc: weatherDescription.value,
            };
        },
    );

    const current_coordinates = request.map(({ query }) => {
        return {
            query,
        };
    });

    const weatherForecast = weather.map(
        ({
            astronomy,
            avgtempC,
            date,
            maxtempC,
            mintempC,
            sunHour,
            hourly,
        }) => {
            const [sunSetRise] = astronomy;
            const { moonrise, moonset, sunrise, sunset } = sunSetRise;
            return {
                date,
                avgtempC,
                maxtempC,
                mintempC,
                sunHour,
                astronomy: { moonrise, moonset, sunrise, sunset },
                hourly,
            };
        },
    );

    return {
        averageTempByMonth,
        condition_current,
        current_coordinates,
        weatherForecast,
        city,
    };
};

export const prepareDataForCharts = (array) => {
    const titleItem = ['Month', 'MAX', 'MIN'];
    const readyData = array.map((item) =>
        Object.values(item)
            .reverse()
            .map((swap, idx, arr) => {
                if (idx === 1) {
                    let temp = Number(swap);
                    swap = Number(arr[2]);
                    arr[2] = temp;
                    return swap;
                }
                return swap;
            }),
    );

    readyData.unshift(titleItem);

    return readyData;
};
