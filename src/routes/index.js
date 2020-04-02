import Article from '~p/Article';
import CreateArticle from '~p/CreateArticle';
import EditArticle from '~p/EditArticle';
import GlobalFeed from '~p/GlobalFeed';
import YourFeed from '~p/YourFeed';
import TagFeed from '~p/TagFeed';
import Page404 from '~p/Page404';
import Authentication from '~p/Authentication';
import Profile from '~p/Profile';
import Settings from '~p/Settings';

let routes = [
    {
        name: 'home',
        url: '/',
        component: GlobalFeed,
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
    },
    {
        name: 'settings',
        url: '/settings/',
        component: Settings,
        exact: true,
    },
    {
        name: 'profile',
        url: '/profile/:user',
        component: Profile,
        exact: true,
    },
    {
        name: 'add',
        url: '/article/new',
        component: CreateArticle,
        exact: true
    },
    {
        name: 'edit',
        url: '/article/:id/edit',
        component: EditArticle,
        exact: true
    },
    {
        name: 'article',
        url: '/article/:id',
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
        name: 'yourFeed',
        url: '/your-feed',
        component: YourFeed,
        exact: true
    },
    {
        name: 'tags',
        url: '/tags/:tag',
        component: TagFeed,
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