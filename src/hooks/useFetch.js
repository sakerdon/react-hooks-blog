import { useState, useEffect, useCallback  } from 'react';
import axios from 'axios';
import useLocalStorage from '~h/useLocalStorage';

export default (url) => {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState({});
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [token] = useLocalStorage('token');

    let cancelResponseWhenHookDestroyed = false;

    const doFetch = useCallback((options = {}) => {
        setOptions(options);
        setIsLoading(true);
    }, []);

    useEffect(() => {
      if (!isLoading) return;

      axios(baseUrl + url, {
            ...options, 
            ...{ headers: { 
                authorization: token ? `Token ${token}` : ''
            } 
        }})
      .then(res => {
        if (cancelResponseWhenHookDestroyed) return;
        setError(false);
        setIsLoading(false);
        setResponse(res.data);
      })
      .catch(err => {
        if (cancelResponseWhenHookDestroyed) return;
        setIsLoading(false);
        setError(err?.response?.data);
        // console.log('err', err?.response?.data?.errors)
      })

      // Отмена запроса
      return () => { cancelResponseWhenHookDestroyed = true };

    }, [isLoading, options, url]);

    return [{isLoading, response, error}, {doFetch, setError}];
}