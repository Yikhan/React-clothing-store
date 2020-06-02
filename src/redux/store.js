import { applyMiddleware, createStore } from 'redux';

import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import rootReducer from './root-reducer';
import rootSaga from "./root-saga";

//* create saga
const sagaMiddleware = createSagaMiddleware();

// const middlewares = [ thunk ];
const middlewares = [ sagaMiddleware ];

if (process.env.NODE_ENV === 'development') {
	middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

//? REVIEW 在root-reducer里已经使用过persistReducer了，单独使用persistStore效果如何呢
//? REVIEW 测试后发现如果没有persistReducer页面无法正常加载，persist/REHYDRATE触发失败
const persistor = persistStore(store);

export { store, persistor };
