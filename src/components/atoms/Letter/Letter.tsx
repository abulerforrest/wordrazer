import * as React from "react";
import { observer } from "mobx-react";

import { ITheme} from "../../../interfaces/Theme";
import injectSheet, { WithSheet } from "react-jss";

const styles = (theme: ITheme) => ({

	"@keyframes letterFocusExpand1": {
		"0%": {
			...theme.animations.letterFocusExpand1.from
		},
		"100%": {
			...theme.animations.letterFocusExpand1.to
		}
	},
	"@keyframes letterFocusExpand2": {
		"0%": {
			...theme.animations.letterFocusExpand2.from
		},
		"100%": {
			...theme.animations.letterFocusExpand2.to
		}
	},

	"@keyframes fadeOut": {
		"0%": {
			...theme.animations.fadeOut.from
		},
		"100%": {
			...theme.animations.fadeOut.to
		}
	},

	"@keyframes fadeOut2": {
		"0%": {
			...theme.animations.fadeOut.from
		},
		"100%": {
			...theme.animations.fadeOut.to
		}
	},

	root: {
		position: "absolute",
		zIndex: 40,
		fontSize: 50,
		marginTop: -5,
		userSelect: "none",
		fontFamily: theme.typography.hiscorePrimary
	},
	
	letterAnim1: {
		opacity: 0,
		color: theme.palette.primary,
		animation: theme.animations.letterFocusExpand1.animation + ", fadeOut 6s"
	},

	letterAnim2: {
		opacity: 0,
		color: theme.palette.secondary,
		animation: theme.animations.letterFocusExpand2.animation + ", fadeOut2 3s"
	}

});

export interface ILetterProps {
	textInput: string
	showLetter: boolean
	onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void
}

type LetterProps = ILetterProps & WithSheet<typeof styles>;

@observer
class Letter extends React.Component<LetterProps> {

	constructor(props: any) {
		super(props);

		const {
			classes,
			onKeyDown
		} = props;
		
		// Event listener
		document.addEventListener('keydown', (event) => {

			onKeyDown(event);

			const element = document.getElementById("letter");

			// Toggle anim classes with JS
			element!.classList.toggle(classes.letterAnim1);
			element!.classList.toggle(classes.letterAnim2);

		});	
	}

	render() : React.ReactNode {

		const { 
			classes,
			textInput,
			showLetter
		} = this.props;

		return (
			<div className={classes.root}>
				<div
					id="letter"
					className={classes.letterAnim1}
				>
					{showLetter? textInput: ""}
				</div>
			</div>
		);

	}

}

export default injectSheet(styles)(Letter);