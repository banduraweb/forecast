import React from 'react';
import Chart from 'react-google-charts';
import { prepareDataForCharts } from '../../lib';
import PropTypes from 'prop-types';

export const YearChartsTemp = ({ temp, city }) => {
    const data = prepareDataForCharts(temp);
    const options = {
        title: `Max Min year average temperature in ${city}`,
        curveType: 'function',
        legend: { position: 'bottom' },
    };

    return (
        <div className="App">
            <Chart
                chartType="LineChart"
                width="100%"
                height="400px"
                data={data}
                options={options}
            />
        </div>
    );
};

YearChartsTemp.propTypes = {
    temp: PropTypes.arrayOf(
        PropTypes.shape({
            averageMaxTem: PropTypes.string.isRequired,
            averageMinTem: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }),
    ),
    city: PropTypes.string.isRequired,
};
