import { createSelector } from 'reselect';

const selectShop = (state) => state.shop;

export const selectCollections = createSelector([ selectShop ], (shop) => shop.collections);

export const selectCollectionsForOverview = createSelector(
	[ selectCollections ],
	(collections) => (collections ? Object.values(collections) : [])
);

export const selectCollection = (collectionName) =>
	createSelector([ selectCollections ], (collections) => (collections ? collections[collectionName] : null));

export const selectIsCollectionFetching = createSelector(
	[ selectShop, selectCollections ],
	//* NOTE either isFetching is true or there is no collections data(which means fetch will surely happen later)
	//* !collection is needed here because isFetching is false by default
	(shop, collections) => shop.isFetching || !collections
);
