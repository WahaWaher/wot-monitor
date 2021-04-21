import { createStore, applyMiddleware } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMidleware from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { rootReducer } from '@/store/reducers/index';

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMidleware))
);

export const persistor = persistStore(store);

export function AppStore({ children, ...props }) {
  return (
    <ReduxProvider store={store} {...props}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </ReduxProvider>
  );
}
