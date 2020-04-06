import React, {useEffect, useState, useContext} from 'react';
import ArticleForm from '~c/ArticleForm';
import useFetch from '~h/useFetch';
import {urlBuilder, routesMap} from '~/routes';
import {Redirect} from 'react-router-dom';
import {CurrentUserContext} from '~ctx/CurrentUser';

export default function CreateArticle() {
	const [{isLoggedIn}] = useContext(CurrentUserContext);

	if (isLoggedIn === false) {
		return <Redirect to={routesMap.home} />
	}

	const [isSubmit, setIsSubmit] = useState(false);
	const apiUrl = `/articles`;
	const [{error, isLoading, response}, {doFetch}] = useFetch(apiUrl);

	const initialValues = {
		title: '',
		description: '',
		body: '',
		tagList: []
	};


	const onSubmit = article => {
		doFetch({method: 'post', data: article})
	};

	useEffect( () => {
		if(!response) return;
		setIsSubmit(true);
	}, [response, setIsSubmit] )

	if(isSubmit) {
		return <Redirect to={urlBuilder('article', {id: response.article.slug})} />
	}

	return (
		<div className="container">
		 <ArticleForm 
		 	onSubmit={onSubmit}
		 	errors={error?.errors || null}
		 	initialValues={initialValues}
		 	/>
		</div>
	)
} 