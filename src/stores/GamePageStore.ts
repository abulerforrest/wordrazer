import { RootStore } from "./RootStore";
import { observable, ObservableMap } from "mobx";

export class GamePageStore {

	private readonly rootStore: RootStore;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}


}