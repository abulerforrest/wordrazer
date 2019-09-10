import * as React from "react";
import injectSheet, { WithSheet } from "react-jss";
import { ITheme } from "../../../interfaces/Theme";
import { Input } from "../../molecules/Input";
import { Button } from "../../atoms/Button";
import { IGamePageController } from "../../../interfaces/pages/GamePageController";
import { Typography } from "../../atoms/Typography";

const styles = (theme: ITheme) => ({

	root: {

	},

});

export interface IPlayerRegistrationProps {
	controller: IGamePageController
}

type PlayerRegistrationProps = IPlayerRegistrationProps & WithSheet<typeof styles>;

class PlayerRegistration extends React.Component<PlayerRegistrationProps> {

	render() : React.ReactNode {

		const { classes, theme } = this.props;

		return (
			<div className={classes.root}>
				<Typography
				fontSize={theme.typography.size.medium}
				bold
				letterSpacing={theme.typography.letterSpacing.large}
				color={theme.palette.white}
				margin="0 0 20px 0"
				uppercase>
					Before we begin, please enter your desired name below so we can calculate your hiscore.
				</Typography>
				<Typography
			></Typography>
				<Input
					showClear
					label="Name"
					placeholder={"________________"}
					uppercase
				/>
				<Button
					margin={"30px 0 0 0 "}
					title={"Start game"} bold uppercase />
			</div>
		);

	}

}

export default injectSheet(styles)(PlayerRegistration);