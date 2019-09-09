import React, { Suspense } from "react";
import { observer } from "mobx-react";

import injectSheet, { WithSheet } from "react-jss";

import { Logo } from "../../atoms/Logo";
import { Button } from "../../atoms/Button";

import { ITheme } from "../../../interfaces/Theme";
import { Typography } from "../../atoms/Typography";
import { Link } from "../../atoms/Link";
import { ITitlePageController } from "../../../interfaces/pages/TitlePageController";

const Hiscore = React.lazy(() => import("../../organisms/Hiscore/Hiscore"));

const styles = (theme: ITheme) => ({
	root: {
		width: "100%",
		display: "flex",
		backgroundColor: theme.palette.secondary,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		height: "100vh",

		backgroundImage: "linear-gradient(to right top, #150215, #250d26, #361038, #49114b, #5d115e)"
	},

	"@keyframes flashing": {
		"0%": { color: theme.palette.white },
		"100%": { color: "transparent" }
	},

	insertCoin: {
		animation: "flashing 0.8s 4s infinite"
	}

});

export interface ITitlePageProps {
	controller: ITitlePageController
	wordOne: string
	wordTwo: string
	buttonLabel: string
	onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

type TitlePageProps = ITitlePageProps & WithSheet<typeof styles>;

@observer
class TitlePage extends React.Component<TitlePageProps> {

	public static defaultProps: Partial<ITitlePageProps> = {

		buttonLabel: "start",
		onClick: () => {}

	}

	render() : React.ReactNode {

		const {
			theme,
			wordOne,
			wordTwo,
			classes,
			controller,
			buttonLabel
		} = this.props;
	
		return (
			<div className={classes.root}>
				<Logo
					wordOne={wordOne}
					wordTwo={wordTwo}
				/>

				<Suspense fallback={<div>Loading...</div>}>
					<Hiscore />
				</Suspense>

				<Link href="/init">
					<Button
						onClick={() => console.log("play")}
						title={buttonLabel}
						uppercase
						bold
					/>
				</Link>

				<Typography
					fontSize={10}
					margin="20px 0 0 0"
					color={theme.palette.white}
					letterSpacing={theme.typography.letterSpacing.large}
					uppercase
					noSelect
				>
					<span className={classes.insertCoin}>Insert coin to play the game</span>
				</Typography>

			</div>
		);

	}

}

export default injectSheet(styles)(TitlePage);