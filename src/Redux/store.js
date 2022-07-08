import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducer/rootReducer";
// import rootSaga from "../Saga/rootSaga";

// const sagaMiddleware = createSagaMiddleware()
 const store = createStore(
rootReducer);
// sagaMiddleware.run(rootSaga);
export default store;