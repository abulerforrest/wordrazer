import * as React from "react";
import { storiesOf } from "@storybook/react";

import { defaultTheme } from "../../themes/theme";
import { Input } from "../../components/molecules/Input";

import {
	text,
	color,
	boolean,
	select
} from "@storybook/addon-knobs";

const COMPONENT_GROUP = "Input";

storiesOf("Molecules", module).add("Input", () => {

	const labelText = text("Label", "Label", COMPONENT_GROUP);
	const showClear = boolean("Show clearbutton", true, COMPONENT_GROUP);
	const autoFocus = boolean("Autofocus", true, COMPONENT_GROUP);
	const inputState = select("State", ["error", "default", "disabled", "success"], "default", COMPONENT_GROUP);
	
	const placeholderText = text(
		"Placeholder text",
		"________________",
		COMPONENT_GROUP
	);

	const containerColor = color(
		"Container background color",
		defaultTheme.palette.grayscale[3], 
		COMPONENT_GROUP
	);

	return (
		<div style={{backgroundColor: containerColor, height: 500, padding: 20}}>
			<Input
				label={labelText}
				state={inputState}
				placeholder={placeholderText}
				showClear={showClear}
				autoFocus={autoFocus}
				onClear={() => console.log("clear")}
				onFocus={() => console.log("focus")}
				onBlur={() => console.log("blur")}
				onClick={() => console.log("click")}
				onKeyPress={() => console.log("keypress")}
				uppercase
			/>
		</div>
	);

});