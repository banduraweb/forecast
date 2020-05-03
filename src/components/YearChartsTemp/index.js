import React from "react";
import Chart from "react-google-charts";
import {prepareDataForCharts} from '../../lib'


export const YearChartsTemp =({temp, city})=> {

	const data = prepareDataForCharts(temp);


	const options = {
		title: `Max Min year average temperature in ${city}`,
		curveType: "function",
		legend: { position: "bottom" }
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