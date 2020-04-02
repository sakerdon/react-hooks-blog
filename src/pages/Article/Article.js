import React, {useEffect, useContext} from 'react';
import {Redirect} from 'react-router-dom';
import useFetch from '~h/useFetch';
import { Link } from 'react-router-dom';
import { urlBuilder } from '~/routes';
import TagList from '~c/TagList';

import Loader from '~c/Loader';
import ErrorMessage from '~c/ErrorMessage';

import { CurrentUserContext } from '~ctx/CurrentUser';
import { routesMap  } from '~/routes';

export default (props) => {
 const [{isLoggedIn, currentUser}] = useContext(CurrentUserContext);
 const id = props.match?.params?.id;
 const apiUrl = `/articles/${id}`;
 const [{response, isLoading, error}, {doFetch}] = useFetch(apiUrl);
 const [{response: responseDelete, isLoading: isLoadingDelete, error: errorDelete}, {doFetch: doFetchDelete}] = useFetch(apiUrl);

 const isAuthor = () => {
  if (!response || !isLoggedIn) {
    return false;
  }
  return response.article?.author?.username === currentUser?.username
 }


 const deleteArticle = () => {
    console.log('delete', id);
    doFetchDelete({method: 'delete'})
 }


 useEffect(() => {
  doFetch();
 }, [doFetch]);

 useEffect(() => {
  if(!response) return;
  document.title = response?.article?.title; 
 }, [response])
  

 if (responseDelete || error?.status === '404') {
    return <Redirect to={routesMap.home} />
 }
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
      { isAuthor() && (
        <div>
          <Link 
            to={urlBuilder( 'edit', {id: id} )} 
            className="btn btn-sm btn-outline-secondary">
            Edit
          </Link>
          <button 
            className="btn btn-sm btn-outline-danger"
            onClick={deleteArticle}>
            Delete
          </button>
        </div>
      )} 
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