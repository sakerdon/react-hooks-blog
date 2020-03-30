import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export default function Pagination({url, currentPage, limit, total}) {
	console.log({url, currentPage, limit, total});
	const pagesCount = Math.ceil(total / limit);
	const pagesList = [...Array(pagesCount).keys()].map( el => el + 1 )

	return (
		<div className="pagination flex-wrap">

	 		{ pagesList.map( page => {
	 		
	 			const itemClassList = classNames({
					'page-item' : true,
					'active':  page.toString() === currentPage.toString()
				})

				return (
		 			<span 
		 				className={ itemClassList } 
		 				key={ page }> 
		 				<Link
		 					to={`${url}?page=${page}`} 
		 					className="page-link">
		 				{ page }
		 				</Link>
		 			</span>
	 			)
			})}
		</div>

	)

}