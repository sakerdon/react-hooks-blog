import React, {Fragment, useState, useEffect } from 'react';
import { Link, Redirect}  from 'react-router-dom';
import useFetch from '~h/useFetch'
import { routesMap } from '~/routes'

export default function Authentication(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [isSuccesSubmit, setIsSuccesSubmit] = useState(false);

  const isLogin = routesMap.login === props.match.path;
  const apiUrl = isLogin ? '/users/login' : '/users';
  const [{isLoading, error, response}, {doFetch, setError}] = useFetch(apiUrl);


  /** 
   * По отправке формы
   * @param e - event инпута
   */
  const onSubmit = (e) => {
    e.preventDefault();
    const user = isLogin ? {email, password} : {email, password, username}
    doFetch({
      method: 'post',
      data: { user }
    });
  }


  /** Сохранение токена*/
  useEffect(() => {
    if (!response) return;
    window?.localStorage?.setItem('token', response?.user?.token);
    setIsSuccesSubmit(true);
  }, [response])


  /** Очистка ошибок при вводе в инпуты*/
  useEffect(() => {
    if (!error) return;
    setError({...error, errors: {...error.errors, username: null }});
  }, [username]);

  useEffect(() => {
    if (!error) return;
    setError({...error, errors: {...error.errors, email: null, 'email or password': null }});
  }, [email]);

  useEffect(() => {
    if (!error) return;
    setError({...error, errors: {...error.errors, password: null, 'email or password': null }});
  }, [password]);


  /** Если пользователь зарегистрирован - редирект на главную*/
  if (isSuccesSubmit) {
    return <Redirect to={routesMap.home} />
  } 

  // TODO вынести в отдельный компонент всю кнопку с логикой загрузки
  const spinnerBtn = (
    <Fragment>
      <span className="spinner-border" role="status" aria-hidden="true">
      </span>
      &nbsp;Loading...
    </Fragment>)


  return (
   <div className="auth-page">
     <div className="container page">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center">{isLogin ? 'Sign in' : 'Sign Up'}</h1>
          <p className="text-xs-center">
          { isLogin 
            ? <Link to="/register">Need an account?</Link>
            : <Link to="/login">Already has an account?</Link>
          }
          </p>
         <form onSubmit={ onSubmit }>
           <fieldset>
            { !isLogin
              ? <fieldset className="form-group">
                <input
                 type="text"
                 className={'form-control form-control-lg ' + (error?.errors?.username ? 'is-invalid' : '')}
                 placeholder="User name"
                 onChange={(e) => setUserName(e.target.value)}
                />
                <div className="invalid-feedback">{error?.errors?.username?.join('\n') || null }</div>
              </fieldset>

              : null
            }
            <fieldset className="form-group">
              <input
               type="email"
               className={'form-control form-control-lg ' + ((error?.errors && error?.errors['email or password']) || error?.errors?.email ? 'is-invalid' : '')}
               placeholder="Email"
               onChange={(e) => setEmail(e.target.value)}
              />
              <div className="invalid-feedback">
                { error?.errors?.email?.join('\n') || null }
              </div>
            </fieldset>
            <fieldset className="form-group">
              <input
               type="password"
               className={'form-control form-control-lg ' + ((error?.errors && error?.errors['email or password']) || error?.errors?.password ? 'is-invalid' : '')}
               placeholder="Password"
               onChange={(e) => setPassword(e.target.value)}
              />
              <div className="invalid-feedback">
                {error?.errors?.password?.join('\n') || null }
              </div>
              <div className="invalid-feedback">
                {(error?.errors && error?.errors['email or password']) ? Object.entries(error?.errors)?.flat(2)?.join('\n') : null }
              </div>
            </fieldset>
            <button
              className="btn btn-lg btn-primary pull-xs-right"
              type="submit"
              disabled={!password || !email || isLoading}
            >
              {isLoading ? spinnerBtn : isLogin ? 'Sign in' : 'Sign Up' }
            </button>
           </fieldset>
         </form>
        </div>
      </div>
     </div>
   </div>
  )
}
