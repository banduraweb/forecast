import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDefaultUsersWeatherByIp } from '../../../../store/actions';
import { Tag } from 'antd';

export const MostViewedPlaces = () => {
    return (
        <span className="history-items">
            <Tag color="success">Kyiv</Tag>
            <Tag color="success">Toronto</Tag>
            <Tag color="success">Lviv</Tag>
            <Tag color="success">Vinn</Tag>
            <Tag color="success">New York</Tag>
        </span>
    );
};
