import { 
  createStore,
  compose,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

export default function configureStore() {
  const middleWares = [
    thunk,
  ];

  return createStore(rootReducer, compose(applyMiddleware(...middleWares)));
}
