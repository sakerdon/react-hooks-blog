import React, { useEffect, Fragment } from 'react';
import useFetch from '~h/useFetch';
import Feed from '~c/Feed';
import TagsCloud from '~c/TagsCloud';
import Pagination from '~c/Pagination';
import FeedTabs from '~c/FeedTabs';
import {routesMap} from '~/routes';
import {getPagination, limit} from '~/utils';
import {stringify} from 'query-string';

export default function YourFeed(props){
 const {currentPage, offset} = getPagination(props?.location?.search);
 const url = props?.match?.url;
 const queryString = stringify({ limit, offset });
 const apiUrl = `/articles/feed?${queryString}`;
 const [{isLoading, response, error}, {doFetch}] = useFetch(apiUrl);

 useEffect( () => {
  doFetch();
 }, [doFetch, queryString]);

 return (
  <div className="container">
   <div className="row">
    <div className="col-md-9">
    <FeedTabs/>
    { isLoading && <div>Lodaing...</div> }
    { error && <div>Error</div> }
    { !isLoading && response && (
      response?.articles?.length 
    ?
     <Fragment>
      <Feed articles={response?.articles}/>
      <Pagination 
       url={url}
       currentPage={currentPage}
       limit={limit}
       total={response?.articlesCount}
      />
     </Fragment>
    :  <div>No articles</div>
    )}
    </div>
      <div className="col-md-3">
        <TagsCloud />
      </div>
   </div>

  </div>
 );
}