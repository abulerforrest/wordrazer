import React, { createRef, Component } from "react";
import { observer } from "mobx-react";

import injectSheet, { WithSheet } from "react-jss";

import { ITheme } from "../../../interfaces/Theme";

import {
	IGamePageController
} from "../../../interfaces/pages/GamePageController";

import { Word } from "../../organisms/Word";

import PlayerStatus from "../../organisms/PlayerStatus/PlayerStatus";

import { PlayerRegistration } from "../../organisms/PlayerRegistration";

import { IThreeJSController } from "../../../interfaces/3Dengine/ThreeJSController";

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
		position: "absolute",
		width: "100%",
		height: "100vh"
	},

	playerRegContainer: {
		width: 400,
		position: "absolute"
	},

	countDownText: {
		position: "absolute",
		transform:"translateX(-50%)",
		top: "50%",
		alignItems: "center",
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
		position: "absolute",
		transform:"translateX(-90%)",
		top: "50%",
		alignItems: "center",

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
	threeJSController: IThreeJSController
}

type GamePageProps = IGamePageProps & WithSheet<typeof styles>;

@observer
class GamePage extends Component<GamePageProps> {

	private canvasRef: any = createRef<HTMLElement>();

	constructor(props: any) {
		super(props);
	}

	componentDidMount() {
		
		const { threeJSController } = this.props;

		this.canvasRef.appendChild(
			threeJSController.renderer.domElement
		);

		function initEventListeners() {
			window.addEventListener("resize", onWindowResize);
		}
		
		function onWindowResize() {
			threeJSController.camera.aspect = window.innerWidth / window.innerHeight;
			threeJSController.renderer.setSize(window.innerWidth, window.innerHeight);
			threeJSController.camera.updateProjectionMatrix();
		}

		threeJSController.loadFont("helvetiker_regular.typeface.json");
		threeJSController.addWordToScene();

		// 3D canvas options
		threeJSController.showBackground = true;
		threeJSController.backgroundURL = "";

		// init 3D canvas
		threeJSController.setup();
		initEventListeners();

	}

	private renderWords() : React.ReactNode {

		const { controller, classes } = this.props;	

		if(controller.gameHasStarted && controller.countDownNumber === 0) {

			return (
				<div>
					<Word word="word" />
				</div>
			);
		}
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
					<div>
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
			theme,
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
			<div className={gameRootClasses} ref={node => this.canvasRef = node}>
				{this.renderGamePlayCanvas()}
				{this.renderPlayerRegistration()}
			</div>

			// <div className={gameRootClasses}>
			// 	{this.renderPlayerRegistration()}
			// 	{this.renderGamePlayCanvas()}
			// 	{this.renderWords()}

			// </div>
		);

	}

}

export default injectSheet(styles)(GamePage);