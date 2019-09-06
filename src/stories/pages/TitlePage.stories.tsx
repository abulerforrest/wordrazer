import * as React from "react";
import { storiesOf } from "@storybook/react";
import { TitlePage } from "../../components/pages/TitlePage";

storiesOf("Pages", module).add("TitlePage", () => {

	return (
		<TitlePage wordOne="Word" wordTwo="Razer" />
	);

});