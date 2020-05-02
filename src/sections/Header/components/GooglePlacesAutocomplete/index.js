import React, { useState } from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import { useHttp } from '../../../../lib';
import { EnvironmentOutlined } from '@ant-design/icons';
import { Input } from 'antd';

const { Search } = Input;

export const GooglePlacesAutocomplete = () => {
    const [address, setAddress] = useState('');
    const [data, setData] = useState(null);
    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null,
    });
    // const { response } = useHttp('http://ip-api.com/json');
    //
    // if (response) {
    //     const { country, city, lat, lon } = response;
    //     console.log(country, city, lat, lon);
    //     //	const {response} = useHttp('https://api.openweathermap.org/data/2.5/weather?lat=50.4501&lon=30.5234&APPID=b25cb1dac8465227f4d2f1bdc6e9a5c7');
    // }

    const FetchData = async () => {
        // //	const city = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodedLocation2}&lang=ua&units=metric&APPID=b25cb1dac8465227f4d2f1bdc6e9a5c7`);
        // const city = await fetch(
        //     `https://api.openweathermap.org/data/2.5/weather?lat=50.4501&lon=30.5234&APPID=b25cb1dac8465227f4d2f1bdc6e9a5c7`,
        // );
        // const dataJson = await city.json();
        // setData(dataJson);
        setAddress('');
    };

    console.log(coordinates, 'coordinates');
    console.log(data);

    const searchOptions = {
        types: ['(cities)'],
    };

    const handleSelect = async (value) => {
        try {
            const results = await geocodeByAddress(value);
            const latLng = await getLatLng(results[0]);
            setAddress(value);
            setCoordinates(latLng);
            console.log(results, 'results');
            console.log(value, 'value');
            FetchData();
            setAddress('');
        } catch (error) {
            console.log(error, 'error');
        }
    };

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
