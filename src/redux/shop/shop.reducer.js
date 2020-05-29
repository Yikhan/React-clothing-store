import { ShopActionTypes } from './shop.types';

const Initial_State = {
	collections: null,
	isFetching: false,
	errorMessage: null
};

const shopReducer = (state = Initial_State, action) => {
	switch (action.type) {
		case ShopActionTypes.FETCH_COLLECTION_START:
			return {
				...state,
				isFetching: true
			};
		case ShopActionTypes.FETCH_COLLECTION_SUCCESS:
			return {
				...state,
				isFetching: false,
				collections: action.payload
			};
		case ShopActionTypes.FETCH_COLLECTION_FAILURE:
			return {
				...state,
				isFetching: false,
				errorMessage: action.payload
			};
		default:
			return state;
	}
};

export default shopReducer;
