import AuthApp from '../containers/auth-app/AuthApp';
import InternalApp from '../containers/internal-app/InternalApp';

import { useAppSelector } from '../hooks/hooks';


const Apps = () => {

  const authStatus = useAppSelector( (state) => state.authApp.authStatus);

  return (
    <>
      {authStatus ? <InternalApp/> : <AuthApp/>}
    </>
  )
};

export default Apps;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();