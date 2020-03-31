import React, {useEffect} from 'react';
import useFetch from '~h/useFetch';
import Loader from '~c/Loader';
import ErrorMessage from '~c/ErrorMessage';
import {routesMap, urlBuilder} from '~/routes';
import {Link} from 'react-router-dom';

export default function TagsCloud() {

	const [{response, isLoading, error}, {doFetch}] = useFetch('/tags');


	useEffect(() => {
		doFetch();
	}, [doFetch]);

	
	if (isLoading) return <Loader/>
	if (error) return <ErrorMessage/>

	return (
		 <div className="tag-list">
				{ response?.tags?.map(el => (
					<Link to={urlBuilder('tags', {tag: el})} className="tag-default tag-pill" key={ el }> { el } </Link>) 
				)}
		 </div>
		)
}