import React, {Fragment, useState, useEffect } from 'react';
import { Link}  from 'react-router-dom';
import axios from 'axios';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [data, doFetch] = useFetch('test')

  const onSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
  }

  useEffect(() => {
    if (!isSubmit) return;

    axios(process.env.REACT_APP_BASE_URL + '/users/login', {
      method: 'post',
      data: {
        user: {email, password}
      }
    })
    .then(res => {
      setIsSubmit(false);
      console.log('res', res);
    })
    .catch(err => {
      setIsSubmit(false);
      console.log('err', err?.response?.data?.errors)
    })
  });


  const spinnerBtn = (<Fragment>
    <span className="spinner-border" role="status" aria-hidden="true">
    </span>
    &nbsp;Loading...
  </Fragment>)



  return (
   <div className="auth-page">
     <div className="container page">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center">Sign in</h1>
          <p className="text-xs-center">
          <Link to="/register">Need an account?</Link>
          </p>
         <form onSubmit={ onSubmit }>
           <fieldset>
            <fieldset className="form-group">
              <input
               type="email"
               className="form-control form-control-lg"
               placeholder="Email"
               onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
            <fieldset className="form-group">
              <input
               type="password"
               className="form-control form-control-lg"
               placeholder="Password"
               onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
            <button
              className="btn btn-lg btn-primary pull-xs-right"
              type="submit"
              disabled={!password || !email || isSubmit}
            >
              {isSubmit ? spinnerBtn :'Sign in'}
            </button>
           </fieldset>
         </form>
        </div>
      </div>
     </div>
   </div>
  )
}
