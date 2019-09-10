import * as React from "react";
import injectSheet, { WithSheet } from "react-jss";
import { ITheme } from "../../../interfaces/Theme";
import { Typography } from "../../atoms/Typography";

const styles = (theme: ITheme) => ({
	root: {
		display: "flex",
		backgroundColor: "transparent",
		height: 50,
		width: "100%",
		color: "#e731ee",
		border: "4px solid white",
		fontFamily: theme.typography.hiscorePrimary,
		fontSize: 50,
		outline: "none",
		padding: "10px 30px 10px 10px",
	},

	inputContainer: {
		width: "390px",
		display: "flex",
		alignItems: "center",
	},
	
	clearIcon: {
		zIndex: 15,
		userSelect: "none",
		display: "flex",
		width: 40,
		marginLeft: "-35px",
		cursor: "pointer",
		fontSize: "40px",
		color: "#e731ee",

		"&:hover": {
			color: theme.palette.white
		}
	},

	bold: {
		fontWeight: "bold"
	},
	uppercase: {
		textTransform: "uppercase"
	}

});

export interface IInputProps {
	label?: string
	placeholder?: string
	autoFocus?: boolean
	uppercase?: boolean
	showClear?: boolean

	onClear?: (event: React.MouseEvent<HTMLElement>) => void
	onClick?: (event: React.MouseEvent<HTMLElement>) => void
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
		onKeyPress: () => {}
	}

	render() : React.ReactNode {

		const {
			label,
			theme,
			onBlur,
			onFocus,
			onClick,
			onClear,
			classes,
			autoFocus,
			showClear,
			uppercase,
			onKeyPress,
			placeholder
		} = this.props;

		const hasTextTransform = uppercase ? classes.uppercase : "";

		const componentClassName = `
			${classes.root}
			${hasTextTransform}
		`;

		let labelComponent: React.ReactNode = null;

		if(label) {
			labelComponent = (
					<div data-testid="daterangepicker-label">
						<Typography
							color={theme.palette.white}
							fontSize={20}
							letterSpacing={theme.typography.letterSpacing.small}
							margin={"0 0 10px 0"}
							uppercase
							bold
						>
							{label}
						</Typography>
					</div>
				);
		}

		let clear: React.ReactNode = null;

		if(showClear) {
			clear = (
				<div
					className={classes.clearIcon}
					onClick={onClear}
					onFocus={onFocus}
				>
					&times;
				</div>
			);
		}

		return (
			<div>
				{labelComponent}
				<div className={classes.inputContainer}>
					<input
						type="text"
						className={componentClassName}
						autoFocus={autoFocus}
						onBlur={onBlur}
						onFocus={onFocus}
						onClick={onClick}
						onKeyPress={onKeyPress}
						placeholder={placeholder}
					/>
					{clear}
				</div>
			</div>
		);

	}

}

export default injectSheet(styles)(Input);