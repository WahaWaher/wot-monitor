import { createStore, applyMiddleware } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import rootReducer from '@/store/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMidleware from 'redux-thunk';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMidleware))
);

export function AppStore(props) {
  return <ReduxProvider store={store} {...props} />;
}
