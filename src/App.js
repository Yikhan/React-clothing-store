import "./App.css";

import { Route, Switch } from "react-router-dom";

import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import React from "react";
import ShopPage from "./pages/shop/shop.component";
import SignInUp from "./pages/sign-in-up/sign-in-up.component";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/signin" component={SignInUp} />
      </Switch>
    </div>
  );
}

export default App;
