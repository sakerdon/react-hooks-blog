import React from 'react';

import useFetch from '~h/useFetch';

export default function AddToFavorites(props) {
	const apiUrl = `/articles/${props.articleId}/favorite`;
	const [{response}, {doFetch}] = useFetch(apiUrl);
	const count = response ? response?.article?.favoritesCount : props.favoritesCount;
	const isFavorited = response ? response?.article?.favorited : props.isFavorited;

	const onClick = () => {
		console.log('test', props.articleId);
		doFetch({method: isFavorited ? 'delete' : 'post'});
	};
	return (
		<button 
			className={'favorites btn ' + ( isFavorited ? 'btn-primary' : 'btn-secondary' )}
			onClick={onClick}>
			♡ {count}
		</button>
	)
};