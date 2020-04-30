import './collection.styles.scss';

import CollectionItem from '../../components/collection-item/collection-item.component';
import React from 'react';
import { connect } from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selectors';

const CollectionPage = ({ collection }) => {
	const { title, items } = collection;
	return (
		<div className="collection-page">
			<h2 className="title">{title}</h2>
			<div className="items">{items.map((item) => <CollectionItem key={item.id} item={item} />)}</div>
		</div>
	);
};

// * NOTE 使用Currying化技巧，注意selectCollection的实现方式，先接受一个id参数再接受state
const mapStateToProps = (state, ownProps) => ({
	collection: selectCollection(ownProps.match.params.collectionName)(state)
});

export default connect(mapStateToProps)(CollectionPage);
