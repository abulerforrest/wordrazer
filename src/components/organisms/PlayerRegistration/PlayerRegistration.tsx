import * as React from "react";
import { observer } from "mobx-react";

import { withRouter } from 'react-router-dom';

import { ITheme } from "../../../interfaces/Theme";
import injectSheet, { WithSheet } from "react-jss";

import { Button } from "../../atoms/Button";
import { Input } from "../../molecules/Input";

import { Typography } from "../../atoms/Typography";

import {
	IGamePageController
} from "../../../interfaces/pages/GamePageController";

const styles = (theme: ITheme) => ({

	"@keyframes slideTop": {
		"0%": {
			...theme.animations.slideTop.from
		},
		"100%": {
			...theme.animations.slideTop.to
		}
	},
	"@keyframes vibrations2": {
		"0%": {
			...theme.animations.vibrations2[0]
		},
		"40%": {
			...theme.animations.vibrations2[40]
		},
		"60%": {
			...theme.animations.vibrations2[60]
		},
		"80%": {
			...theme.animations.vibrations2[80]
		},
		"100%": {
			...theme.animations.vibrations2[100]
		}
	},
	root: {
		animation: theme.animations.slideTop.animation
	},

	descriptionText: {
		textAlign: "center",
		textShadow: theme.typography.textShadowLight,
		animation: theme.animations.vibrations2.animation
	}

});

export interface IPlayerRegistrationProps {
	controller: IGamePageController
}

type PlayerRegistrationProps = IPlayerRegistrationProps & WithSheet<typeof styles>;

@observer
class PlayerRegistration extends React.Component<PlayerRegistrationProps> {

	constructor(props: any) {
		super(props);
	}

	render() : React.ReactNode {

		const {
			theme,
			classes,
			controller
		} = this.props;

		const ButtonComponent = withRouter(({ history }) => {

			let startGame = () => {};

			if(controller.inputValidated) {
				startGame = () => { controller.startGame() };
			}

			return (
				<Button
					state={controller.inputValidated? "success": "disabled"}
					margin={"30px 0 0 0 "}
					title={"Start game"}
					onClick={startGame}
					uppercase
					bold
				/>
			);
		});

		return (
			<div className={classes.root}>
				<Typography
					className={classes.descriptionText}
					fontSize={theme.typography.size.medium}
					letterSpacing={theme.typography.letterSpacing.large}
					color={theme.palette.white}
					margin="0 0 20px 0"
					uppercase
					bold
				>
					Before we begin, please enter your desired name below so we can calculate your hiscore.
				</Typography>

				<Input
					label="Name"
					value={controller.viewModel.name}
					placeholder={"________________"}
					validationText={controller.inputValidated? "Alrighty then, let's go!": controller.textValidateMessage}
					state={controller.inputState as any}
					showClear={controller.showInputClearIcon}
					onChange={event => controller.onInputKeypress(event.target.value)}
					onClear={() => controller.clearInput("name")}
					uppercase
				/>
				<ButtonComponent />
			</div>
		);

	}

}

export default injectSheet(styles)(PlayerRegistration);