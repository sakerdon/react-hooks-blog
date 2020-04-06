import React, {useEffect, useState, useContext} from 'react';
import ArticleForm from '~c/ArticleForm';
import useFetch from '~h/useFetch';
import {urlBuilder, routesMap} from '~/routes';
import {Redirect} from 'react-router-dom';
import {CurrentUserContext} from '~ctx/CurrentUser';

export default function EditArticle(props) {
	const id = props.match.params.id;
	const [{isLoggedIn}] = useContext(CurrentUserContext);
	
	if (isLoggedIn === false || !id) {
		return <Redirect to={routesMap.home} />
	}


	const [initialValues, setInitialValues] = useState(null);
	const getArticleApiUrl = `/articles/${id}`;
	const [{
				response: getArticleResponse, 
				isLoading: getArticleLoading
			}, 
			{ doFetch: doArticleFetch}
	] = useFetch(getArticleApiUrl);


	const [isSubmit, setIsSubmit] = useState(false);
	const UpdateApiUrl = `/articles/${id}/`;
	const [{
				error: updateArticleError, 
				isLoading: updateArticleLoading, 
				response: updateArticleResponse}, 
			{ doFetch: doUpdate }
	] = useFetch(UpdateApiUrl);

	const onSubmit = article => {
		doUpdate({method: 'put', data: article})
	};


	useEffect( () => {
		if (!getArticleResponse) return;
		setInitialValues({
			title: getArticleResponse.article.title,
			description: getArticleResponse.article.description,
			body: getArticleResponse.article.body,
			tagList: getArticleResponse.article.tagList,
		})
	}, [getArticleResponse]) 

	useEffect( () => {
		doArticleFetch();
	}, [doArticleFetch])

	useEffect( () => {
		if(!updateArticleResponse) return;
		setIsSubmit(true);
	}, [updateArticleResponse, setIsSubmit])


	if(isSubmit) {
		{return <Redirect to={urlBuilder('article', {id: updateArticleResponse.article.slug})} />}
	}

	return (
		<div className="container">
		 <ArticleForm 
		 	onSubmit={onSubmit}
		 	errors={updateArticleError?.errors || null}
		 	initialValues={initialValues}
		 	/>
		</div>
	)
} 