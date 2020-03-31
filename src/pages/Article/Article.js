import React, {useEffect} from 'react';
import useFetch from '~h/useFetch';
import { Link } from 'react-router-dom';
import { urlBuilder } from '~/routes';
import TagList from '~c/TagList';

import Loader from '~c/Loader';
import ErrorMessage from '~c/ErrorMessage';

export default (props) => {
 const id = props.match?.params?.id;
 const apiUrl = `/articles/${id}`;
 const [{response, isLoading, error}, {doFetch}] = useFetch(apiUrl);


 useEffect(() => {
  doFetch();
 }, [doFetch]);


 useEffect(() => {
  if(!response) return;
  document.title = response?.article?.title; 
  
 }, [response])

 return (
  <div className="article-page">
   <div className="banner">
     {!isLoading && response && (
     <div className="container">
      <h1>{response?.article?.title}</h1>
      <div className="article-meta">
       <Link to={urlBuilder( 'profile', {user: response?.article?.author?.username} )}>
        { response?.article?.author?.username }
       </Link>
       <span className="date">{response?.article?.createdAt}</span>
      </div> 
     </div>
     )}
   </div>
   <div className="container page">
    {isLoading && <Loader />}
    {error && <ErrorMessage />}
    {!isLoading && response && (
     <div className="row article-content">
      <div className="col-xs-12">
       <div><p>{response.article?.body}</p></div>
       <TagList tagList={response?.article?.tagList}/>
      </div>
     </div>
    )}
   </div>
  </div>
   
 );
}