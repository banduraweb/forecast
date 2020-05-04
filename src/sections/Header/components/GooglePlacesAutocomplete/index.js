import React, { useState, useEffect, useRef } from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import {
    getUsersForecast,
    setUserHistorySearch,
} from '../../../../store/actions';
import { MostViewedPlaces } from '../../components';
import { ErrorBanner } from '../../../../components';
import { EnvironmentOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { validator } from '../../../../lib';
const { Search } = Input;

export const GooglePlacesAutocomplete = () => {
    const dispatch = useDispatch();
    const [address, setAddress] = useState('');
    const [error, setError] = useState(false);
    useEffect(() => {
        setError(false);
    }, [address.length]);
    const searchOptions = {
        types: ['(cities)'],
    };

    const handleSelect = async (value) => {
        try {
            const results = await geocodeByAddress(value);
            const latLng = await getLatLng(results[0]);
            await setAddress(value);
            await dispatch(getUsersForecast(latLng.lat, latLng.lng, value));
            const { lat, lng } = latLng;

            dispatch(setUserHistorySearch({ lat, lng, value }));

            setAddress('');
        } catch (e) {
            setError(true);
        }
    };

    return (
        <div>
            <PlacesAutocomplete
                value={validator(address)}
                onChange={setAddress}
                onSelect={handleSelect}
                searchOptions={searchOptions}
                debounce={500}
                onError={() => {
                    console.log('error');
                }}
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
                        <div className="app-header__search-group">
                            <Search
                                className="app-header__search-input"
                                {...getInputProps({
                                    placeholder: 'Type address',
                                })}
                            />
                            <MostViewedPlaces />
                        </div>
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
                                        key={suggestion.description}
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
            {error && (
                <ErrorBanner
                    description={'Check you input ;)'}
                    message={`Oh sorry but we have no forecast for this ${address} :(`}
                />
            )}
        </div>
    );
};
