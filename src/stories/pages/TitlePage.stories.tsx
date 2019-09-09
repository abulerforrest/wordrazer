import * as React from "react";
import { storiesOf } from "@storybook/react";
import { TitlePage } from "../../components/pages/TitlePage";
import { Router } from "react-router";
import { createBrowserHistory } from "history";
import { text } from "@storybook/addon-knobs";
import { TitlePageService } from "../../services/TitlePageService";
import { IServices } from "../../services/createServices";
import { RootStore } from "../../stores/RootStore";

import { 
	TitlePageController
} from "../../controllers/pages/TitlePageController";

const services : Partial<IServices> = {
	titlePageService: new TitlePageService()
}

const rootStore = new RootStore(services as any);

const COMPONENT_GROUP = "TitlePage";

storiesOf("Pages", module).add("TitlePage", () => {

	const wordOne = text("wordOne", "Word", COMPONENT_GROUP);
	const wordTwo = text("wordTwo", "Razer", COMPONENT_GROUP);
	const buttonLabel = text("startButtonLabel", "start", COMPONENT_GROUP);
	const controller = new TitlePageController(rootStore);

	return (
		<Router history={createBrowserHistory()}>
			<TitlePage
				controller={controller}
				wordOne={wordOne}
				wordTwo={wordTwo}
				buttonLabel={buttonLabel}
			/>
		</Router>
	);

});