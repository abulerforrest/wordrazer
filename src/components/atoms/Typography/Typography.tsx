import * as React from "react";
import { observer } from "mobx-react";

import injectSheet, { WithSheet } from "react-jss";

import {
	ColorProperty,
	TextTransformProperty
} from "csstype";

import { ITheme } from "../../../interfaces/Theme";

import {
	ComponentColor,
	ComponentMargin,
	ComponentLetterSpacing
} from "../../../interfaces/Component";

export type TypographyType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

export interface ITypographyProps {
	children: React.ReactNode

	bold?: boolean
	noWrap?: boolean
	uppercase?: boolean

	fontSize?: number

	className: string
	type?: TypographyType

	color?: ComponentColor
	margin?: ComponentMargin

	noSelect?: boolean

	letterSpacing?: ComponentLetterSpacing

	onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

const styles = (theme: ITheme) => ({
	root: {
		fontFamily: theme.typography.primary,
		display: "block"
	},

	noWrap: {
		overflow: "hidden",
		whiteSpace: "nowrap",
		textOverflow: "ellipsis"
	},

	bold: {
		fontWeight: "bold"
	},
	
	noSelect: {
		userSelect: "none"
	}
});

interface ITypographyStyles {
	fontSize?: number
	color?: ColorProperty
	margin?: ComponentMargin
	textTransform?: TextTransformProperty
	letterSpacing?: ComponentLetterSpacing
}

type TypographyProps = ITypographyProps & WithSheet<typeof styles>;

@observer
class Typography extends React.Component<TypographyProps> {

	public static defaultProps: Partial<ITypographyProps> = {
		margin: 0,
		noWrap: false,
		type: "p",
		bold: false,
		className: "",
		noSelect: false,
		letterSpacing: "",
		uppercase: false,
		onClick: () => {}
	}

	render() : React.ReactNode {

		const {
			type,
			bold,
			color,
			theme,
			margin,
			noWrap,
			classes,
			onClick,
			noSelect,
			fontSize,
			children,
			className,
			uppercase,
			letterSpacing
		} = this.props;

		const style: ITypographyStyles = {
			margin,
			fontSize,
			color: theme.palette.blackPrimary
		};

		const hasWeight = bold ? classes.bold : "";
		const hasWrap = noWrap ? classes.noWrap : "";
		const hasNoSelect = noSelect ? classes.noSelect : "";

		const componentClassName = `${classes.root} ${className} ${hasWeight} ${hasWrap} ${hasNoSelect}`;

		if(fontSize !== null && fontSize !== undefined) {
			style.fontSize = fontSize;
		}

		if(color !== null && color !== undefined) {
			style.color = color;
		}

		if(letterSpacing !== null && letterSpacing !== undefined) {
			style.letterSpacing = letterSpacing;
		}

		if(uppercase) {
			style.textTransform = "uppercase";
		}

		return React.createElement(type as string, {
			className: componentClassName,
			onClick,
			style,
			"data-testid": "typography"
		}, children);
	}
}

export default injectSheet(styles)(Typography);