import { IGamePageController } from "../../interfaces/pages/GamePageController";
import { RootStore } from "../../stores/RootStore";
import { GamePageStore } from "../../stores/GamePageStore";
import { observable } from "mobx";

export class GamePageController
	implements IGamePageController {

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