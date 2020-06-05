import cartReducer from './cart/cart.reducer';
import { combineReducers } from 'redux';
import directoryReducer from './directory/directory.reducer';
import { persistReducer } from 'redux-persist';
import shopReducer from './shop/shop.reducer';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/user.reducer';

//* 本地持久化储存
const persistConfig = {
	key: 'root',
	storage,
	whitelist: [ 'cart' ]
};

const rootReducer = combineReducers({
	user: userReducer,
	cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
});

//* NOTE 持久化储存redux数据
export default persistReducer(persistConfig, rootReducer);
