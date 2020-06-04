import './App.css';

import { Redirect, Route, Switch } from 'react-router-dom';

import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import React from 'react';
import ShopPage from './pages/shop/shop.component';
import SignInUp from './pages/sign-in-up/sign-in-up.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionsForOverview } from './redux/shop/shop.selectors';
import { selectCurrentUser } from './redux/user/user.selectors';

class App extends React.Component {
	// * this is the handler given back from onAuthStateChanged
	unsubscribeFromAuth = null;

	render() {
		return (
			<div>
				<Header />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/shop" component={ShopPage} />
					<Route exact path="/checkout" component={CheckoutPage} />
					<Route
						exact
						path="/signin"
						render={() => (this.props.currentUser ? <Redirect to="/" /> : <SignInUp />)}
					/>
				</Switch>
			</div>
		);
	}
}

// * ANCHOR createStructuredSelector会自动引入root state作为参数
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	collectionsArray: selectCollectionsForOverview
});

export default connect(mapStateToProps, null)(App);
