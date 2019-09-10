import * as React from "react";
import { storiesOf } from "@storybook/react";
import { defaultTheme } from "../../themes/theme";
import { PlayerRegistration } from "../../components/organisms/PlayerRegistration";

import { 
	GamePageController
} from "../../controllers/pages/GamePageController";

import { IServices } from "../../services/createServices";

import { GamePageService } from "../services/GamePageService";
import { RootStore } from "../../stores/RootStore";

const services : Partial<IServices> = {
	gamePageService: new GamePageService()
}

const rootStore = new RootStore(services as any);

storiesOf("Organisms", module).add("PlayerRegistration", () => {

const controller = new GamePageController(rootStore);

	return (
		<div style={{backgroundImage: defaultTheme.palette.gradient[0], height: 500, padding: 50}}>
			<PlayerRegistration controller={controller} />
		</div>
	);

});