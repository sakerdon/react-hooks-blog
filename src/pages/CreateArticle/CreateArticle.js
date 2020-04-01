import React, {useEffect, useState, useContext} from 'react';
import ArticleForm from '~c/ArticleForm';
import useFetch from '~h/useFetch';
import {urlBuilder, routesMap} from '~/routes';
import {Redirect} from 'react-router-dom';
import {CurrentUserContext} from '~ctx/CurrentUser';

export default function CreateArticle() {
	const [{isLoggedIn}] = useContext(CurrentUserContext);
	
	if (!isLoggedIn) {
		return <Redirect to={routesMap.home} />
	}

	const [isSubmit, setIsSubmit] = useState(false);
	const apiUrl = `/articles`;
	const [{error, isLoading, response}, {doFetch}] = useFetch(apiUrl);

	console.log('isLoggedIn', isLoggedIn);
	const initialValues = {
		title: '',
		description: '',
		body: '',
		tagList: []
	};


	const onSubmit = article => {
		doFetch({method: 'post', data: article})
		console.log('article', article);
	};

	useEffect( () => {
		if(!response) return;
		setIsSubmit(true);
	}, [response, setIsSubmit] )

	if(isSubmit) {
		console.log('response.article.slug', response.article.slug);
		{return <Redirect to={urlBuilder('article', {id: response.article.slug})} />}
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