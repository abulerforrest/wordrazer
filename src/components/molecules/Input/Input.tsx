import * as React from "react";
import injectSheet, { WithSheet } from "react-jss";
import { ITheme } from "../../../interfaces/Theme";
import { Typography } from "../../atoms/Typography";

const styles = (theme: ITheme) => ({

	"@keyframes vibrations": {
		"0%": {
			...theme.animations.vibrations[0]
		},
		"40%": {
			...theme.animations.vibrations[40]
		},
		"60%": {
			...theme.animations.vibrations[80]
		},
		"80%": {
			...theme.animations.vibrations[80]
		},
		"100%": {
			...theme.animations.vibrations[100]
		}
	},

	root: {
		display: "flex",
		height: 50,
		fontSize: 50,
		width: "100%",
		outline: "none",
		backgroundColor: "transparent",
		padding: "10px 30px 10px 10px",
		color: theme.palette.primary,
		border: theme.border.bold,
		borderColor: theme.border.color,
		fontFamily: theme.typography.hiscorePrimary
	},

	inputContainer: {
		width: 390,
		display: "flex",
		alignItems: "center"
	},
	
	clearIcon: {
		width: 40,
		zIndex: 15,
		display: "flex",
		userSelect: "none",
		marginLeft: "-35px",
		cursor: theme.cursor.link,
		color: theme.palette.primary,
		fontSize: theme.typography.size.xlarge,

		"&:hover": {
			color: theme.palette.white
		}
	},

	clearIconSuccess: {
		color: theme.palette.success,
		textShadow:  theme.typography.textShadowLight
	},

	clearIconError: {
		color: theme.palette.danger
	},

	clearIconDisabled: {
		userSelect: "none",
		cursor: theme.cursor.disabled,
		opacity: theme.disabledOpacity
	},

	successIcon: {
		fontSize: 25,
		marginLeft: 20,
		userSelect: "none",
		color: theme.palette.success,
		textShadow:  theme.typography.textShadowLight
	},

	defaultState: {
		color: theme.palette.primary
	},

	successState: {
		color: theme.palette.success,
		borderColor: theme.palette.success,
		textShadow:  theme.typography.textShadowLight,
		animation: theme.animations.vibrations.animation
	},

	errorState: {
		color: theme.palette.danger,
		borderColor: theme.palette.danger
	},

	disabledState: {
		userSelect: "none",
		cursor: theme.cursor.disabled,
		opacity: theme.disabledOpacity
	},

	bold: {
		fontWeight: "bold"
	},
	uppercase: {
		textTransform: "uppercase"
	},

	"@keyframes shake": {
		"0%": {
			...theme.animations.shake[0]
		},
		"60%": {
			...theme.animations.shake[60]
		},
		"70%": {
			...theme.animations.shake[70]
		},
		"80%": {
			...theme.animations.shake[80]
		},
		"90%": {
			...theme.animations.shake[90]
		},
		"100%": {
			...theme.animations.shake[100]
		}
	  },
	
	validationText: {
		textTransform: "uppercase",
		animation: theme.animations.shake.animation
	}
});

export type InputState = "default" | "success" | "loading" | "error" | "disabled";

export interface IInputProps {
	label?: string
	placeholder?: string
	autoFocus?: boolean
	uppercase?: boolean
	showClear?: boolean
	state?: InputState
	value?: string
	validationText?: string

	onClear?: (event: React.MouseEvent<HTMLElement>) => void
	onClick?: (event: React.MouseEvent<HTMLElement>) => void
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
	onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
	onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

type InputProps = IInputProps & WithSheet<typeof styles>;

class Input extends React.Component<InputProps> {

	public static defaultProps: Partial<IInputProps> = {
		label: "",
		autoFocus: true,

		placeholder: ">______________",
		onBlur: () => {},
		onClick: () => {},
		onClear: () => {},
		onFocus: () => {},
		onKeyPress: () => {},
		onChange: () => {}
	}

	render() : React.ReactNode {

		const {
			label,
			state,
			theme,
			value,
			onBlur,
			onFocus,
			onClick,
			onClear,
			classes,
			onChange,
			autoFocus,
			showClear,
			uppercase,
			onKeyPress,
			validationText,
			placeholder
		} = this.props;

		const hasTextTransform = uppercase ? classes.uppercase : "";

		let inputState = null;
		let clearIconState = null;

		if(state === "default") {
			inputState = classes.defaultState;
		}
		else if(state === "error") {
			inputState = classes.errorState;
			clearIconState = classes.clearIconError;
		}
		else if(state === "disabled") {
			inputState = classes.disabledState;
			clearIconState = classes.clearIconDisabled;
		}
		else if(state === "success") {
			inputState = classes.successState;
			clearIconState = classes.clearIconSuccess;
		}

		const componentClassName = `
			${classes.root}
			${inputState}
			${hasTextTransform}
		`;

		const clearIconClasses = `
			${classes.clearIcon}
			${clearIconState}
		`;

		let labelComponent: React.ReactNode = null;

		if(label) {
			labelComponent = (
					<div data-testid="daterangepicker-label">
						<Typography
							fontSize={20}
							margin={"0 0 10px 0"}
							color={theme.palette.white}
							letterSpacing={theme.typography.letterSpacing.small}
							uppercase
							bold
						>
							{label}
						</Typography>
					</div>
				);
		}

		let clear: React.ReactNode = null;
		let successCheckmark: React.ReactNode = null;
		let validationComponent: React.ReactNode = null;

		if(showClear) {
			clear = (
				<div
					className={clearIconClasses}
					onClick={onClear}
				>
				&times;
				</div>
				
			);
		}

		if(state === "success") {
			successCheckmark = (
				<span className={classes.successIcon}>
					&#10004;
				</span>
			);
		}

		if(validationText) {
			validationComponent = (
				<Typography
					margin={"10px 0 0 0"}
					color={theme.palette.white}
					className={classes.validationText}
					fontSize={14}
					bold
				>
					{validationText}
				</Typography>
			);
		}

		return (
			<div>
				{labelComponent}
				<div className={classes.inputContainer}>
					<input
						type="text"
						value={value}
						className={componentClassName}
						onBlur={onBlur}
						onClick={onClick}
						onFocus={onFocus}
						onChange={onChange}
						autoFocus={autoFocus}
						onKeyPress={onKeyPress}
						placeholder={placeholder}
					/>
					{clear}
					{successCheckmark}
				</div>
				{validationComponent}
			</div>
		);

	}

}

export default injectSheet(styles)(Input);