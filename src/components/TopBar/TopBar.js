import React from 'react';
import {NavLink} from 'react-router-dom';
import { routesMap } from '~/routes';
export default function TopBar() {
 return (
  <div className="container">
   <nav className="navbar navbar-light navbar-expand">
     <NavLink className="navbar-brand"
       to={routesMap.home}>
      SuperBestBlog
     </NavLink>
     <div className="nav navbar-nav ml-auto">
      <div className="nav-item">
       <NavLink
         className="nav-link" 
         to={routesMap.article} 
         exact activeClassName="active">
        Article
       </NavLink>
      </div>
      <div className="nav-item">
       <NavLink 
         className="nav-link" 
         to={routesMap.globalFeed} 
         exact activeClassName="active">
        globalFeed
       </NavLink>
      </div>
      <div className="nav-item">
       <NavLink 
         className="nav-link" 
         to={routesMap.login} 
         exact activeClassName="active">
        Sign in
       </NavLink>
      </div>
      <div className="nav-item">
       <NavLink 
         className="nav-link" 
         to={routesMap.register} 
         exact activeClassName="active">
        Sign Up
       </NavLink>
      </div>
     </div>
   </nav>
  </div>
 )
}