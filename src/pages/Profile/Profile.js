import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';

import { urlBuilder } from '~/routes';
import useFetch from '~h/useFetch';
import Loader from '~c/Loader';
import UserArticles from '~c/UserArticles';

export default function Profile(props) {
 const userSlug = props.match?.params?.user;
 const apiUrl = `/profiles/${userSlug}`
 const [{response, error, isLoading}, {doFetch}] = useFetch(apiUrl);

 useEffect(() => {
  doFetch();
 }, []);

 if (!response) return <Loader />;

 return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img className="user-img" alt="" src={response.profile?.image} />
              <h4>{response.profile?.username}</h4>
              <p>{response.profile?.bio}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <NavLink
                    exact
                    to={urlBuilder('profile', { user: response.profile?.username}) }
                    className="nav-link"
                  >
                    My Posts
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={urlBuilder('profile-favorites', { user: response.profile?.username}) }
                    className="nav-link"
                  >
                    Favorites Posts
                  </NavLink>
                </li>
              </ul>
            </div>
            <UserArticles 
              username={response.profile?.username}
              url={props.match.url}
              location={props.location}
              />
          </div>
        </div>
      </div>
    </div>
  ) 

}