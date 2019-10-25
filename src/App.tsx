import React from 'react';

import { TitlePage } from "./components/pages";

import injectSheet, { WithSheet } from "react-jss";

import { ITheme } from './interfaces/Theme';

const styles = (theme: ITheme) => ({
	root: {
		display: "flex"
	}
});

type AppProps = WithSheet<typeof styles>;

class App extends React.Component<AppProps> {

	render() : React.ReactNode {

		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<TitlePage wordOne="Word" wordTwo="Razer" />
			</div>
		);
	}
}

export default injectSheet(styles)(App);