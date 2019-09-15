import React from "react";
import { observer } from "mobx-react";

import injectSheet, { WithSheet } from "react-jss";

import { ITheme } from "../../../interfaces/Theme";

import {
	IGamePageController
} from "../../../interfaces/pages/GamePageController";

import PlayerStatus from "../../organisms/PlayerStatus/PlayerStatus";
import { PlayerRegistration } from "../../organisms/PlayerRegistration";

const styles = (theme: ITheme) => ({

	"@keyframes fadeIn": {
		"0%": {
			...theme.animations.fadeIn.from
		},
		"100%": {
			...theme.animations.fadeIn.to
		},
	},
	"@keyframes fadeInBlur": {
		"0%": {
			...theme.animations.fadeInBlur.from
		},
		"100%": {
			...theme.animations.fadeInBlur.to
		},
	},

	"@keyframes scroll": {
		"0%": { top: "100%", opacity: 1 },
		"100%": { top: "-100%", opacity: 0 }
	},

	"@keyframes bgPan": {
		"0%": {
			backgroundPosition: "50% 0%"			
		},
		"100%": {
			backgroundPosition: "50% 100%"
		}
	},

	"@keyframes blurExpandFade": {
		"0%": {
			...theme.animations.blurExpandFade[0]
		},
		"60%": {
			...theme.animations.blurExpandFade[60]
		},
		"100%": {
			...theme.animations.blurExpandFade[100]
		}
	},
	
	root: {
		width: "100%",
		display: "flex",
		height: "100vh",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundImage: theme.palette.gradient[0],
		animation: theme.animations.fadeIn.animation
	},

	background: {
		zIndex: 0,
		//backgroundImage: "url(/assets/img/bg.jpg)",
		backgroundRepeat: "no-repeat",
		backgroundAttachment: "fixed",
		backgroundPosition: "100% 100%",
		animation: theme.animations.fadeInBlur.animation
	},

	gameRoot: {
		display: "flex",
		width: "100%",
		height: "100vh",
		marginTop: 250,
		userSelect: "none",
		justifyContent: "center"
	},
	
	gameCanvasContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		animation: "bgPan 08s linear infinite",
		position: "absolute",
		bottom: -20,
		left: 0,
		backgroundImage: "linear-gradient(rgba(176, 2, 182, 1) .1em, transparent .1em), linear-gradient(90deg, rgba(176, 2, 182, 1) .1em, transparent .1em)",
		transform: "perspective(200px) rotateX(40deg) scale(2,1) translate3d(0, 0, 0)",
		backgroundSize: "3em 3em",
		width: "100%",
		height: "100vh",
		animationPlayState: "paused",
		"-webkitTransformStyle": "preserve-3d",
		backfaceVisibility: "hidden",
		"-webkitBackfaceVisibility": "hidden",
		"-webkitPerspective": 1000,
		filter: "blur(4px)"
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
	},
	playerRegContainer: {
		width: 400
	},

	countDownText: {
		filter: "blur(0.4px)",
		display: "flex",
		letterSpacing: 1,
		color: theme.palette.white,
		fontSize: 60,
		textTransform: "uppercase",
		fontFamily: theme.typography.hiscorePrimary
	},

	startText: {
		display: "flex",
		fontSize: 65,
		textTransform: "uppercase",
		color: theme.palette.primaryLight,
		fontFamily: theme.typography.hiscorePrimary,
		textShadow: theme.typography.textShadowPrimary,
		letterSpacing: theme.typography.letterSpacing.small,
		animation: theme.animations.blurExpandFade.animation
	}

});

export interface IGamePageProps {
	controller: IGamePageController
}

type GamePageProps = IGamePageProps & WithSheet<typeof styles>;

@observer
class GamePage extends React.Component<GamePageProps> {

	constructor(props: any) {
		super(props);
	}

	private renderPlayerRegistration() : React.ReactNode {

		const { controller, classes } = this.props;

		if(controller.showPlayerRegistration && !controller.gameHasStarted) {
			return (
				<div className={classes.playerRegContainer}>
					<PlayerRegistration controller={controller} />
				</div>
			);
		}
	}

	private renderCountDownText() : React.ReactNode {
		const {
			classes,
			controller
		} = this.props;
		
		const { countDownNumber } = controller;
	
		if(countDownNumber > 0) {
			return (<div className={classes.countDownText}>{countDownNumber}</div>);			
		} else {
			return (<div className={classes.startText}>Start</div>);
		}
	}

	private renderGamePlayCanvas() : React.ReactNode {

		const {
			classes,
			controller
		} = this.props;

		const runAnimation = controller.runBackgroundAnim? "running": "paused";

		if(!controller.showPlayerRegistration) {

			return (
					<div className={classes.gameRoot}>
						{this.renderCountDownText()}
						<PlayerStatus controller={controller} />
						<div className={classes.gameCanvasContainer} style={{animationPlayState: runAnimation}} />
					</div>
			);

		}
	}

	render() : React.ReactNode {

		const {
			classes,
			controller
		} = this.props;

		let backgroundClass = null;

		if(controller.gameHasStarted) {
			backgroundClass = classes.background;
		}

		const gameRootClasses = `
			${classes.root}
			${backgroundClass}
		`;

		return (
			<div className={gameRootClasses}>
				{this.renderPlayerRegistration()}
				{this.renderGamePlayCanvas()}

				{/* <div className={classes.text3D}>
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
				</div> */}

			</div>
		);

	}

}

export default injectSheet(styles)(GamePage);