import * as React from "react";
import injectSheet, { WithSheet } from "react-jss";
import { ITheme } from "../../../interfaces/Theme";

const styles = (theme: ITheme) => ({
	root: {
		display: "block",
		borderRadius: 40,
		color: "#b002b6",
		minWidth: 194,
		minHeight: 60,
		fontSize: theme.typography.size.large,
		letterSpacing: theme.typography.letterSpacing.small,
		zIndex: 2,
		border: "none",
		outline: "none",
		transition: "all ease 0.4s",
		boxShadow: "inset 0 0 0 0 #31302B",

		"&:hover": {
			cursor: "pointer",
			color: "#FFFFFF",
			borderRadius: 40,
			backgroundColor: "",
			border: "4px solid #FFF6FF",
			boxShadow: "inset 194px 0 0 0 #F947FB"
		}
	},

	bold: {
		fontWeight: "bold"
	},
	uppercase: {
		textTransform: "uppercase"
	}

});

export interface IButtonProps {
	title: string
	bold?: boolean
	uppercase?: boolean

	onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

type ButtonProps = IButtonProps & WithSheet<typeof styles>;

class Button extends React.Component<ButtonProps> {

	public static defaultProps: Partial<IButtonProps> = {

		bold: false,
		uppercase: false,
		onClick: () => {}

	}

	render() : React.ReactNode {

		const {
			title,
			bold,
			classes,
			onClick,
			uppercase
		} = this.props;

		const hasWeight = bold ? classes.bold : "";
		const hasTextTransform = uppercase ? classes.uppercase : "";

		const componentClassName = `
			${classes.root}
			${hasWeight}
			${hasTextTransform}
		`;

		return (
			<button
				type="button"
				className={componentClassName}
				onClick={onClick}
			>
				{title}
			</button>
		);

	}

}

export default injectSheet(styles)(Button);