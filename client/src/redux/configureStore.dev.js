import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import monitorReducersEnhancer from './enhancers/monitorReducers';

import rootReducer from './reducers';
import rootSaga from './sagas';

export default function configureStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, logger];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
  const composedEnhancers = compose(...enhancers);
  const store = createStore(rootReducer, preloadedState, composedEnhancers);

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
