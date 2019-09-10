import * as React from "react";
import injectSheet, { WithSheet } from "react-jss";
import { ITheme } from "../../../interfaces/Theme";

const styles = (theme: ITheme) => ({

	root: {
		display: "flex",
		flexDirection: "column",
		userSelect: "none",
		fontSize: 20,
		maxHeight: "220px",
		minHeight: "150px",
		color: theme.palette.secondary,
		textTransform: "uppercase",
		fontFamily: theme.typography.hiscorePrimary,
		width: 800
	},

	columnRow: {
		justifyContent: "space-evenly",
		fontSize: 26,
		display: "flex",
		flexDirection: "row"
	},

	playersList: {
		justifyContent: "space-evenly",
		fontSize: 21,
		color: theme.palette.white,
		display: "flex",
		flexDirection: "row"
	},

	hiscoreLabel: {
		color: theme.palette.white,
		fontSize: 34,
		textDecoration: "underline"
	},

	column: {
		width: 200,
		display: "flex",
		justifyContent: "center",
		alignContent: "center"
	}

});

export interface IHiscoreProps {

}

type HiscoreProps = IHiscoreProps & WithSheet<typeof styles>;

class Hiscore extends React.Component<HiscoreProps> {

	render() : React.ReactNode {

		const { classes } = this.props;

		return (
			<div className={classes.root}>

				<div className={classes.hiscoreLabel}>
					Hiscore
				</div>
				
				<div className={classes.columnRow}>
				
					<div className={classes.column}>
						Rank
					</div>
					<div className={classes.column}>
						Score
					</div>
					<div className={classes.column}>
						Name
					</div>
				
				</div>

				<div className={classes.playersList}>

					<div className={classes.column}>
						1
					</div>
					<div className={classes.column}>
						20
					</div>
					<div className={classes.column}>
						Alex
					</div>

				</div>

			</div>
		);

	}

}

export default injectSheet(styles)(Hiscore);