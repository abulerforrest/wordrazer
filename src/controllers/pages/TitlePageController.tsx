import { observable } from "mobx";

import { RootStore } from "../../stores/RootStore";
import { GamePageStore } from "../../stores/GamePageStore";

import {
	ITitlePageController
} from "../../interfaces/pages/TitlePageController";

export class TitlePageController
	implements ITitlePageController {

	private readonly rootStore: RootStore;
	private readonly store: GamePageStore;

	@observable public loading: boolean = false;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;

		this.store = rootStore.gamePageStore;

		this.load();
	}

	private async load() : Promise<void> {
		this.loading = true;

		try {


		}
		catch(error) {

		}
		finally {
			this.loading = false;
		}
	}

}