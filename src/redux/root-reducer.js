import cartReducer from './cart/cart.reducer';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/user.reducer';

//* NOTE user被firebase管理了，不需要本地持久化储存
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const rootReducer = combineReducers({
	user: userReducer,
	cart: cartReducer
});

//* NOTE 持久化储存redux数据
export default persistReducer(persistConfig, rootReducer);
// export default rootReducer;
