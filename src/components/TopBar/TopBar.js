import React, { useContext, Fragment } from 'react';
import {NavLink} from 'react-router-dom';
import { routesMap } from '~/routes';
import { CurrentUserContext } from '~ctx/CurrentUser';


export default function TopBar() {

const [{currentUser, isLoggedIn}] = useContext(CurrentUserContext);

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

      { !isLoggedIn 
        ? <Fragment>
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
          </Fragment>
        : <Fragment>
            <div className="nav-item">
             <NavLink 
               className="nav-link" 
               to={routesMap.add} 
               exact activeClassName="active">
              + Add article
             </NavLink>
            </div>

            <div className="nav-item">
              <div className="nav-link">
                {currentUser?.username}
              </div>
            </div>
        </Fragment>
      }
     </div>
   </nav>
  </div>
 )
}