import React from 'react';
import { render } from "react-dom";

import { BrowserRouter as Router, Route } from "react-router-dom";

import injectSheet, { ThemeProvider } from "react-jss";

import App from "./App";

import { ITheme } from "./interfaces/Theme";
import { defaultTheme } from "./themes/theme"

import './index.css';

import * as serviceWorker from './serviceWorker';
import { GamePage } from './components/pages/GamePage';
import { GamePageController } from './controllers/pages/GamePageController';
import { ThreeJSController } from './controllers/3Dengine/ThreeJSController';
import { RootStore } from './stores/RootStore';
import { GamePageService } from './services/GamePageService';
import { IServices } from './services/createServices';

const services : Partial<IServices> = {
	gamePageService: new GamePageService()
}

const rootStore = new RootStore(services as IServices);

const threeJSController = new ThreeJSController();
const gamePageController = new GamePageController(rootStore, threeJSController);

const styles = (theme: ITheme) => ({
	root: {

		}
});
  
const styledApp = (Component: any) => {

	const WrappedClass = ({ classes }: any) => (
		<div className={classes.root}>
			<Component threeJSController={threeJSController} controller={gamePageController} />
		</div>
	);
	
	const InjectedStyle = injectSheet(styles)(WrappedClass);
	
	return (
		<ThemeProvider theme={defaultTheme}>
			<InjectedStyle />
		</ThemeProvider>
	);
}

render(
	<Router>
		<Route
			exact path="/"
			component={() => styledApp(App)}
		/>
		<Route
			path="/init"
			component={() => styledApp(GamePage)}
		/>
	</Router>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();