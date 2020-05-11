import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';

import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import React from 'react';
import { Route } from 'react-router-dom';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpnner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
	state = {
		isLoading: true
	};

	unsubscribeFromSnapshot = null;

	componentDidMount() {
		const { updateCollections } = this.props;
		const collectionRef = firestore.collection('collections');

		this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async (snapshot) => {
			const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
			updateCollections(collectionsMap);
			this.setState({ isLoading: false });
		});
	}

	componentWillUnmount() {
		this.unsubscribeFromSnapshot();
	}

	render() {
		const { match } = this.props;
		const { isLoading } = this.state;
		return (
			<div className="shop-page">
				<Route
					exact 
					path={`${match.path}`}
					render={(props) => <CollectionOverviewWithSpinner isLoading={isLoading} {...props} />}
				/>
				<Route
					path={`${match.path}/:collectionName`}
					render={(props) => <CollectionPageWithSpnner isLoading={isLoading} {...props} />}
				/>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	updateCollections: (collectionMap) => dispatch(updateCollections(collectionMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
