import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';

export default function configureStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middlewares)
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
