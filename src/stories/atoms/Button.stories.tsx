import * as React from "react";

import { storiesOf } from "@storybook/react";
import { defaultTheme } from "../../themes/theme";
import { text, color } from "@storybook/addon-knobs";
import { Button } from "../../components/atoms/Button";

const COMPONENT_GROUP = "Logo";

storiesOf("Atoms", module).add("Button", () => {

	const componentText = text("Text", "Button", COMPONENT_GROUP);
	const containerColor = color("Container backgorund color", defaultTheme.palette.grayscale[7], COMPONENT_GROUP);

	return (
		<div style={{backgroundColor: containerColor, height: 500, padding: 20}}>
			<Button title={componentText} uppercase bold/>
		</div>
	);

});