import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Logo } from "../../components/atoms/Logo";
import { text } from "@storybook/addon-knobs";

const COMPONENT_GROUP = "Logo";

storiesOf("Atoms", module).add("Logo", () => {

	const componentText1 = text("wordOne", "WORD", COMPONENT_GROUP);
	const componentText2 = text("wordTwo", "RAZER", COMPONENT_GROUP);

	return (
		<div style={{background: "#000000", minHeight: "800px"}}>
			<Logo wordOne={componentText1} wordTwo={componentText2}/>
		</div>
	);

});