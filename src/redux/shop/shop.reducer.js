import Shop_Data from './shop.data';

const Initial_State = {
	collections: Shop_Data
};

const shopReducer = (state = Initial_State, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

export default shopReducer;
