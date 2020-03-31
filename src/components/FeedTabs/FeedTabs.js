import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {routesMap, urlBuilder} from '~/routes';
import { CurrentUserContext } from '~ctx/CurrentUser'

export default function FeedTabs(props) {
 const [currentUserState] = useContext(CurrentUserContext);
 return (
  <div className="feed-tabs">
   <div className="nav nav-pills">
    { currentUserState.isLoggedIn && (
     <div className="nav-item">
      <NavLink to={routesMap.yourFeed} className="nav-link">Your Feed</NavLink>
     </div>)}
    <div className="nav-item">
     <NavLink to={routesMap.home} className="nav-link" exact>Global Feed</NavLink>
    </div>
    { props.tag && 

    <div className="nav-item">
     <NavLink to={urlBuilder('tags', {tag: props.tag})} className="nav-link" exact> #{ props.tag }</NavLink>
    </div>
    }
   </div>
  </div>
 )
}