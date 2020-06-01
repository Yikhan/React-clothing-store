import Collection from './collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';

const mapStateToProps = createStructuredSelector({
	isLoading: selectIsCollectionFetching
});

const CollectionContainer = compose(
  connect(mapStateToProps), 
  WithSpinner
)(Collection);

export default CollectionContainer;
