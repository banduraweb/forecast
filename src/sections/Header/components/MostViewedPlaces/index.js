import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersForecast } from '../../../../store/actions';
import { Tag } from 'antd';

export const MostViewedPlaces = () => {
    const userHistorySearch = useSelector((state) => state.userHistorySearch);
    const dispatch = useDispatch();
    console.log(userHistorySearch, 'userHistorySearch');
    return (
        <div className="history-items">
            {!!userHistorySearch.length &&
                userHistorySearch.map(({ lat, lng, value }) => (
                    <Tag
                        key={lat - lng}
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                            dispatch(getUsersForecast(lat, lng, value))
                        }
                        color="success"
                    >
                        {value.split(/,|-/).splice(0, 1).join('')}
                    </Tag>
                ))}
        </div>
    );
};
