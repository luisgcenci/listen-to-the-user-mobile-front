import './src/containers/firebase/config';
import { Provider } from 'react-redux';
import Apps from '@components/Apps'
import { store } from '@store/store';
const App = () => {

  return (
    <Provider store={store}>
      <Apps/>
    </Provider>
  )
};

export default App;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();