import * as React from "react";
import injectSheet, { WithSheet } from "react-jss";

import { ITheme } from "../../../interfaces/Theme";
import { ComponentMargin } from "../../../interfaces/Component";

const styles = (theme: ITheme) => ({
	root: {
		zIndex: 2,
		padding: "0 20px 0 20px",
		borderRadius: theme.border.radius,
		color: theme.palette.primaryLight,
		minWidth: 194,
		minHeight: 60,
		fontSize: theme.typography.size.mediumSecondary,
		letterSpacing: theme.typography.letterSpacing.small,
		border: "none",
		outline: "none",
		backgroundPosition: "right bottom",
		transition: "all 0.2s ease-out",
		boxShadow: theme.boxShadowButtonPrimary,

		"&:hover": {
			cursor: "pointer",
			color: theme.palette.white,
			borderRadius: theme.border.radius,
			border: theme.border.button,
			backgroundPosition: "left bottom",
			boxShadow: theme.boxShadowButtonSecondary
		}
	},

	successState: {
		cursor: "pointer",
		color: theme.palette.white,
		borderRadius: theme.border.radius,
		border: theme.border.button,
		backgroundPosition: "left bottom",
		boxShadow: theme.boxShadowButtonSecondary
	},

	bold: {
		fontWeight: "bold"
	},

	uppercase: {
		textTransform: "uppercase"
	},

	disabledState: {
		opacity: theme.disabledOpacity,
		cursor: theme.cursor.disabled,
		userSelect: "none"
	}
});

export type ButtonState = "default" | "success" | "loading" | "error" | "disabled";

interface IButtonStyles {
	margin?: ComponentMargin
}

export interface IButtonProps {
	bold?: boolean
	uppercase?: boolean
	title: string
	state?: ButtonState
	margin?: ComponentMargin

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
			bold,
			title,
			state,
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
		const hasSuccess = state === "success" ? classes.successState : "";
		const hasDisabled = state === "disabled" ? classes.disabledState : "";

		const componentClassName = `
			${classes.root}
			${hasWeight}
			${hasSuccess}
			${hasDisabled}
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