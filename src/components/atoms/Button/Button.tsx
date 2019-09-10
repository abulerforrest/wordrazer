import * as React from "react";
import injectSheet, { WithSheet } from "react-jss";
import { ITheme } from "../../../interfaces/Theme";
import { ComponentMargin } from "../../../interfaces/Component";

const styles = (theme: ITheme) => ({
	root: {
		zIndex: 2,
		paddingLeft: 20,
		paddingRight: 20,
		display: "block",
		borderRadius: 40,
		color: "#b002b6",
		minWidth: 194,
		minHeight: 60,
		fontSize: theme.typography.size.large,
		letterSpacing: theme.typography.letterSpacing.small,
		border: "none",
		outline: "none",
		backgroundSize: "200% 100%",
		backgroundPosition: "right bottom",
		transition: "all 0.2s ease-out",
		background: "linear-gradient(to right, #F947FB 50%, white 50%)",
		boxShadow: "inset 0 0 0 0 #31302B",

		"&:hover": {
			"-webkitTransformStyle": "preserve-3d",
			"-webkit-backfaceVisibility": "hidden",
			cursor: "pointer",
			color: "#FFFFFF",
			borderRadius: 40,
			backgroundColor: "#F947FB",
			border: "4px solid #FFF6FF",
			backgroundPosition: "left bottom",
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

interface IButtonStyles {
	margin?: ComponentMargin
}

export interface IButtonProps {
	title: string
	bold?: boolean
	margin?: ComponentMargin
	uppercase?: boolean

	onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

type ButtonProps = IButtonProps & WithSheet<typeof styles>;

class Button extends React.Component<ButtonProps> {

	public static defaultProps: Partial<IButtonProps> = {
		margin: 0,
		bold: false,
		uppercase: false,
		onClick: () => {}

	}

	render() : React.ReactNode {

		const {
			title,
			bold,
			margin,
			classes,
			onClick,
			uppercase
		} = this.props;

		const style: IButtonStyles = {
			margin
		};

		const hasWeight = bold ? classes.bold : "";
		const hasTextTransform = uppercase ? classes.uppercase : "";

		const componentClassName = `
			${classes.root}
			${hasWeight}
			${hasTextTransform}
		`;

		return (
			<button
				style={style}
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