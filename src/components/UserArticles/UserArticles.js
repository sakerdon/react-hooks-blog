import React, {useEffect, Fragment} from 'react';
import {stringify} from 'query-string';

import {getPagination, limit} from '~/utils';
import useFetch from '~h/useFetch';
import Loading from '~c/Loader';
import ErrorMessage from '~c/ErrorMessage'
import Feed from '~c/Feed'
import Pagination from '~c/Pagination'

const getApiUrl = ({username, offset, isFavorites}) => {
  const params = isFavorites
    ? {
        limit,
        offset,
        favorited: username
      }
    : {
        limit,
        offset,
        author: username
      };
  return `/articles?${stringify(params)}`;
};

export default function UserArticles({username, location, url}) {
  const isFavorites = location.pathname.includes('favorites');
  const {offset, currentPage} = getPagination(location.search);
  const apiUrl = getApiUrl({username, offset, isFavorites});
  const [{response, isLoading, error}, {doFetch}] = useFetch(apiUrl);

  useEffect(() => {
    doFetch()
  }, [doFetch, isFavorites, currentPage]);

  return (
    <div>
      {isLoading && <Loading />}
      {error && <ErrorMessage />}
      {!isLoading && response && (
        <Fragment>
          <Feed articles={response.articles} />
          <Pagination
            total={response.articlesCount}
            limit={limit}
            url={url}
            currentPage={currentPage}
          />
        </Fragment>
      )}
    </div>
  )
}

