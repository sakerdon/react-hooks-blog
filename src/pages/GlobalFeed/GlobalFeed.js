import React, { useEffect, Fragment } from 'react';
import useFetch from '~h/useFetch';
import Feed from '~c/Feed';
import Pagination from '~c/Pagination';
import {routesMap} from '~/routes';
import {getPagination, limit} from '~/utils';
import {stringify} from 'query-string';

export default function GlobalFeed(props){
	const {currentPage, offset} = getPagination(props?.location?.search);
	const url = props?.match?.url;
	const queryString = stringify({ limit, offset });
	const apiUrl = `/articles?${queryString}`;
	const [{isLoading, response, error}, {doFetch}] = useFetch(apiUrl);

	useEffect( () => {
		doFetch();
	}, [doFetch, currentPage]);

    return (
        <div className="container">
           	<h1>GlobalFeed</h1>
            <div className="row">
            	<div className="col-md-9">
            	{ isLoading && <div>Lodaing...</div> }
            	{ error && <div>Error</div> }
            	{ !isLoading && response && (
            		<Fragment>
            			<Feed articles={response?.articles}/>
            			<Pagination 
            				url={url}
            				currentPage={currentPage}
            				limit={limit}
            				total={response?.articlesCount}
            			/>
            		</Fragment>
            	)}

            	</div>
            	<div className="col-md-3">tags</div>

            </div>

        </div>
    );
}