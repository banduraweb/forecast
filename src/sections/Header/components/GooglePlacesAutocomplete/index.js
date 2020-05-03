import React, { useState } from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import { getDefaultUsersWeatherByIp } from '../../../../store/actions';
import {MostViewedPlaces} from '../../components'
import { EnvironmentOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';

const { Search } = Input;

export const GooglePlacesAutocomplete = () => {
    const dispatch = useDispatch();
    const [address, setAddress] = useState('');

    const searchOptions = {
        types: ['(cities)'],
    };

    const handleSelect = async (value) => {
        try {
            const results = await geocodeByAddress(value);
            const latLng = await getLatLng(results[0]);
            setAddress(value);
            dispatch(getDefaultUsersWeatherByIp(latLng.lat, latLng.lng, value));
            setAddress('');
        } catch (error) {
            console.log(error, 'error');
        }
    };
    console.log(address, 'address');
    return (
        <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
            searchOptions={searchOptions}
            debounce={500}
            onError={() => console.log('onError')}
            highlightFirstSuggestion={true}
            style={{ background: 'red' }}
        >
            {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
            }) => (
                <div>
                    <Search
                        className="app-header__search-input"
                        {...getInputProps({ placeholder: 'Type address' })}
                    />
                        <MostViewedPlaces/>
                    <div style={{ zIndex: '1000', fontSize: '12px' }}>
                        {loading ? <div>...loading</div> : null}

                        {suggestions.map((suggestion) => {
                            const style = {
                                backgroundColor: suggestion.active
                                    ? '#41b6e6'
                                    : '#fff',
                                height: '40px',
                                lineHeight: '40px',
                            };
                            return (
                                <div
                                    {...getSuggestionItemProps(suggestion, {
                                        style,
                                    })}
                                >
                                    <div
                                        style={{
                                            marginLeft: '5px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <EnvironmentOutlined
                                            style={{ color: '#32AAC6' }}
                                        />{' '}
                                        {suggestion.description}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    );
};
