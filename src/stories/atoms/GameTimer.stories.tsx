import * as React from "react";
import { storiesOf } from "@storybook/react";
import { GameTimer } from "../../components/atoms/GameTimer";
import { boolean } from "@storybook/addon-knobs";

const COMPONENT_GROUP = "GameTimer"

storiesOf("Atoms", module).add("GameTimer", () => {

	return (
		<div style={{background: "#FFFFFFF", minHeight: "800px"}}>
			<GameTimer
				timeOutput={"test"}
			/>
		</div>
	);

});