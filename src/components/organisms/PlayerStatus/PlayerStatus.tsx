import * as React from "react";
import { observer } from "mobx-react";

import { ITheme } from "../../../interfaces/Theme";
import injectSheet, { WithSheet } from "react-jss";

import {
	IGamePageController
} from "../../../interfaces/pages/GamePageController";

import { Letter } from "../../atoms/Letter";
import { GameTimer, Typography } from "../../atoms";

const styles = (theme: ITheme) => ({

	"@keyframes vibrant": {
		"0%": {
			...theme.animations.vibrant[0]
		},
		"20%": {
			...theme.animations.vibrant[20]
		},
		"40%": {
			...theme.animations.vibrant[40]
		},
		"60%": {
			...theme.animations.vibrant[60]
		},
		"80%": {
			...theme.animations.vibrant[80]
		},
		"100%": {
			...theme.animations.vibrant[100]
		}
	},

	root: {
		display: "flex",
		position: "absolute",
		justifyContent: "space-between",
		top: 8,
		right: -150,
		width: 1000
	},

	timePosition: {
		position: "relative",
		marginRight: 60
	},

	label: {
		display: "flex",
		fontSize: 35,
		fontFamily: theme.typography.hiscorePrimary,
		letterSpacing: theme.typography.letterSpacing.small
	},

	user: {
		color: theme.palette.primary,
		textShadow: theme.typography.textShadowPrimary
	},

	score: {
		color: theme.palette.success,
		animation: theme.animations.vibrant.animation,
		textShadow: theme.typography.textShadowSecondary
	}

});

export interface IPlayerStatus {
	controller: IGamePageController
}

type PlayerStatusProps = IPlayerStatus & WithSheet<typeof styles>;

@observer
class PlayerStatus extends React.Component<PlayerStatusProps> {

	render() : React.ReactNode {

		const {
			theme,
			classes,
			controller
		} = this.props;

		const scoreLabelClasses = `
		${classes.score}
		${classes.label}
		`;

		const userLabelClasses = `
		${classes.user}
		${classes.label}
		`;

		return (
			<div className={classes.root}>
				<Typography
					fontSize={theme.typography.size.mediumSecondary}
					color={theme.palette.white}
					uppercase
					bold
				>
					Level
					<span className={scoreLabelClasses}>
						6
					</span>
				</Typography>
				<Typography
					fontSize={theme.typography.size.mediumSecondary}
					color={theme.palette.white}
					uppercase
					bold
				>
					Lifes
					<span className={scoreLabelClasses}>
						5
					</span>
				</Typography>
				<Typography
					fontSize={theme.typography.size.mediumSecondary}
					color={theme.palette.white}
					uppercase
					bold
				>
					Score
					<span className={scoreLabelClasses}>
						100102P
					</span>
				</Typography>
				<Typography
					fontSize={theme.typography.size.mediumSecondary}
					color={theme.palette.white}
					uppercase
					bold
				>
					Username
					<span className={userLabelClasses}>
						Emanuellllll1232
					</span>
				</Typography>
				<div>
					<Typography
						fontSize={theme.typography.size.mediumSecondary}
						color={theme.palette.white}
						uppercase
						bold
					>
						Key input
					</Typography>
					<Letter
						onKeyDown={(event: KeyboardEvent) => controller.onKeyboardInput(event)}
						textInput={controller.textInput}
						showLetter={controller.countDownNumber === 0 && controller.gameHasStarted}
					/>
				</div>
				<div className={classes.timePosition}>
					<Typography
						fontSize={theme.typography.size.mediumSecondary}
						color={theme.palette.white}
						uppercase
						bold
					>
						Time elapsed
					</Typography>
					<GameTimer timeOutput={controller.gameCurrentTime} />
				</div>
			</div>
		);

	}

}

export default injectSheet(styles)(PlayerStatus);