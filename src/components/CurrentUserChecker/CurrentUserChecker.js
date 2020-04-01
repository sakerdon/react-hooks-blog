import React, { useEffect, useContext } from 'react';
import useFetch from '~h/useFetch'
import useLocalStorage from '~h/useLocalStorage'
import { CurrentUserContext } from '~ctx/CurrentUser';

export default function CurrentUserChecker({ children }) {
    const [{ response, isLoading }, { doFetch }] = useFetch('/user');
    const [, dispatch] = useContext(CurrentUserContext);
    const [token] = useLocalStorage('token');

    useEffect(() => {
    	if (!token) {
    		dispatch({type: 'SET_UNAUTHORIZED'});
    		return;
    	}
        doFetch();
        dispatch({type: 'LOADING'});
        
    }, [token, dispatch, doFetch]);

    useEffect(() => {
    	if (!response) return;
        dispatch({type: 'SET_AUTHORIZED', payload: response.user});
    	
    }, [response, dispatch])

    return isLoading ? <div className="loader">Loading...</div> : children;
}