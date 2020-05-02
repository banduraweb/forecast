import React, { useState, useEffect } from 'react';

export const useHttp = (url, options = null) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const res = await fetch(url, options);
                const json = await res.json();
                setResponse(json);
                setIsLoading(false);
            } catch (error) {
                setError(error);
            }
        })();
    }, []);
    return { response, error, isLoading };
};

// export const getUserInfo = async ()=>{
// 	try {
// 		const data = await fetch('http://ip-api.com/json');
// 		const {country, city, lat, lon} = await data.json();
// 		return {country, city, lat, lon};
// 	} catch (e) {
// 		throw new Error(`Failed to get user info error : ${e}`)
// 	}
// };
