import CollectionOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.component'
import React from 'react';
import {Route} from 'react-router-dom'

const ShopPage = ({ match }) => (
	<div className="shop-page">
		<Route exact path={`${match.path}`} component={CollectionOverview} />
		<Route path={`${match.path}/:collectionName`} component={CollectionPage} />
	</div>
);

export default ShopPage; 
