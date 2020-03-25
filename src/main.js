import React from 'react';
import ReactDom from 'react-dom';
import App from './app';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDom.render(<App/>, document.querySelector('#app'));

console.log('REACT_APP_BASE_URL', process.env.REACT_APP_BASE_URL);
