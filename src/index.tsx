import React from 'react';
import { render } from "react-dom";

import injectSheet, { ThemeProvider } from "react-jss";

import App from "./App";

import { ITheme } from "./interfaces/Theme";
import { defaultTheme } from "./themes/theme"

import './index.css';

import * as serviceWorker from './serviceWorker';

const styles = (theme: ITheme) => ({

	root: {

		}
	});
  
	const Wrapped = ({ classes }: any) => (
		<div className={classes.root}>
			<App />
		</div>
	);
  
  const InjectedStyle = injectSheet(styles)(Wrapped);
  
  const StyledApp = () => (
	<ThemeProvider theme={defaultTheme}>
	  <InjectedStyle />
	</ThemeProvider>
  );

render(<StyledApp />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();