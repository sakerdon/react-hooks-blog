import { useState, useEffect  } from 'react';
import axios from 'axios';

export default url => {
	const [isLoading, setIsLoading] = useState(false);
	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);
	const [options, setOptions] = useState({});
	const baseUrl = process.env.REACT_APP_BASE_URL


	const doFetch = (options = {}) => {
		setOptions(options);
		setIsLoading(true);
	};

	useEffect(() => {
	  if (!isLoading) return;

	  axios(baseUrl + url, options)
	  .then(res => {
	  	setError(false);
	    setIsLoading(false);
	    setResponse(res.data);
	    console.log('res', res);
	  })
	  .catch(err => {
	    setIsLoading(false);
	    setError(err?.response?.data);
	    console.log('err', err?.response?.data?.errors)
	  })
	}, [isLoading]);

	return [{isLoading, response, error}, {doFetch, setError}];
}