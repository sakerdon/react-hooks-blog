import Article from '~p/Article';
import GlobalFeed from '~p/GlobalFeed';
import Page404 from '~p/Page404';
import Authentication from '~p/Authentication';

let routes = [
    {
        name: 'home',
        url: '/',
        component: Article,
        exact: true
    },
    {
        name: 'register',
        url: '/register',
        component: Authentication,
        exact: true
    },
    {
        name: 'login',
        url: '/login',
        component: Authentication,
        exact: true,
        params: {test: 'test'}
    },
    {
        name: 'article',
        url: '/article',
        component: Article,
        exact: true
    },
    {
        name: 'globalFeed',
        url: '/global-feed',
        component: GlobalFeed,
        exact: true
    },
    {
        url: '**',
        component: Page404
    }
];

let routesMap = {};

routes.forEach((route) => {
    if(route.hasOwnProperty('name')){
        routesMap[route.name] = route.url;
    }
});

let urlBuilder = function(name, params){
    if(!routesMap.hasOwnProperty(name)){
        return null;
    }

    let url = routesMap[name]; // news/:id

    for(let key in params){
        url = url.replace(':' + key, params[key]);
    }

    return url;
}

export default routes;
export {routesMap, urlBuilder};