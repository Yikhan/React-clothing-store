import {ShopActionTypes} from './shop.types'
import Shop_Data from './shop.data';

const Initial_State = {
	collections: Shop_Data
};

const shopReducer = (state = Initial_State, action) => {
	switch (action.type) {
		case ShopActionTypes.UPDATE_COLLECTIONS:
			return {
				...state,
				collections: action.payload
			}
		default:
			return state;
	}
};

export default shopReducer;
