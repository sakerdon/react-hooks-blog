import React from 'react';

import useFetch from '~h/useFetch';

export default function AddToFavorites(props) {
	const apiUrl = `/articles/${props.articleId}/favorite`;
	const [{response, isLoading}, {doFetch}] = useFetch(apiUrl);
	const count = response ? response?.article?.favoritesCount : props.favoritesCount;
	const isFavorited = response ? response?.article?.favorited : props.isFavorited;

	const onClick = () => {
		doFetch({method: isFavorited ? 'delete' : 'post'});
	};
	return (
		<button 
			className={'favorites btn ' + ( isFavorited ? 'btn-primary' : 'btn-secondary' )}
			disabled={isLoading}
			onClick={onClick}>
			{ isLoading 
				? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
				: '♡ ' + count
			}
		</button>
	)
};