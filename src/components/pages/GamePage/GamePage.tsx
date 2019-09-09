import React from "react";
import { observer } from "mobx-react";

import injectSheet, { WithSheet } from "react-jss";

import { ITheme } from "../../../interfaces/Theme";
import { Typography } from "../../atoms/Typography";

import {
	IGamePageController
} from "../../../interfaces/pages/GamePageController";

const styles = (theme: ITheme) => ({

	"@keyframes fadeIn": {
		"0%": { opacity: 0 },
		"100%": { opacity: 1 }
	},

	"@keyframes scroll": {
		"0%": { top: "100%", opacity: 1 },
		"100%": { top: "-100%", opacity: 0 }
	},

	root: {
		width: "100%",
		display: "flex",
		backgroundColor: theme.palette.primaryDark,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		height: "100vh",
		animation: "fadeIn ease 0.6s",
		backgroundImage: "linear-gradient(to right top, #040404, #09080a, #0e0c0f, #120f12, #161215)"
	},

	text3D: {
		opacity: 0,
			"-webkitTransformOrigin": "50% 120%",
			transform: "perspective(300px) rotateX(35deg)",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			animationIterationCount: 1,
			animation: "scroll 20s linear 0s forwards",
			position: "absolute",
			top: "50%"
	}

});

export interface IGamePageProps {
	controller: IGamePageController
}

type GamePageProps = IGamePageProps & WithSheet<typeof styles>;

@observer
class GamePage extends React.Component<GamePageProps> {

	render() : React.ReactNode {

		const {
			theme,
			classes,
			controller
		} = this.props;
	
		return (
			<div className={classes.root}>

				<div className={classes.text3D}>
					<Typography
						fontSize={50}
						color={theme.palette.white}
					>
						<span>Space</span>
					</Typography>
					<Typography
						margin="50px 0 0 0"
						fontSize={50}
						color={theme.palette.white}
					>
						<span>Galactica</span>
					</Typography>
					<Typography
						margin="50px 0 0 0"
						fontSize={50}
						color={theme.palette.white}
					>
						<span>Invaders</span>
					</Typography>
					<Typography
						margin="50px 0 0 0"
						fontSize={50}
						color={theme.palette.white}
					>
						<span>Martian</span>
					</Typography>
					<Typography
						margin="50px 0 0 0"
						fontSize={50}
						color={theme.palette.white}
					>
						<span>Trek</span>
					</Typography>
				</div>

			</div>
		);

	}

}

export default injectSheet(styles)(GamePage);