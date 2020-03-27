import React, { useEffect, useContext } from 'react';
import useFetch from '~h/useFetch'
import useLocalStorage from '~h/useLocalStorage'
import { CurrentUserContext } from '~ctx/CurrentUser';

export default function CurrentUserChecker({ children }) {
    const [{ response, isLoading }, { doFetch }] = useFetch('/user');
    const [, setCurrentUserState] = useContext(CurrentUserContext);
    const [token] = useLocalStorage('token');

    useEffect(() => {
    	if (!token) {
    		setCurrentUserState( state => ({
    			...state,
    			isLoggedIn: false
    		}))	
    		return;
    	}
        doFetch();
        setCurrentUserState( state => ({
        	...state,
        	isLoading: true	
        }))
    }, [token, setCurrentUserState, doFetch]);

    useEffect(() => {
    	if (!response) return;
    	setCurrentUserState( state => ({
    		...state,
    		isLoggedIn: true,
    		isLoading: false,
    		currentUser: response?.user
    	}));
    }, [response, setCurrentUserState])

    console.log('response', response);
    return isLoading ? <div className="loader">Loading...</div> : children;
}