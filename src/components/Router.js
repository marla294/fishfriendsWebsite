import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";

const Router = props => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/Home" component={Home} />
		</Switch>
	</BrowserRouter>
);

export default Router;