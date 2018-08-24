import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import monitorReducersEnhancer from './enhancers/monitorReducers';

import rootReducer from './reducers';
import rootSaga from './sagas';

export default function configureStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware();
  let middlewares = [sagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
  let composeEnhancers = compose;

  if (
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  } else {
    middlewares.push(logger);
  }

  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(...enhancers)
  );

  let sagaTask = sagaMiddleware.run(function*() {
    yield rootSaga();
  });

  if (module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
    module.hot.accept('./sagas', () => {
      sagaTask.cancel();
      sagaTask.done.then(
        () =>
          (sagaTask = sagaMiddleware.run(function*() {
            yield rootSaga();
          }))
      );
    });
  }

  return store;
}
