import {ShopActionTypes} from './shop.types'

const Initial_State = {
	collections: null
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
