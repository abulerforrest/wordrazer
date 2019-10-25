import { RootStore } from "./RootStore";
import { observable, ObservableMap } from "mobx";
import { HiscoreModel } from "../models/HiscoreModel";
import { IHiscore } from "../interfaces/Hiscore";

type HiscoreMap = ObservableMap<number, HiscoreModel>

export class TitlePageStore {

	private readonly rootStore: RootStore;
	private readonly hiscore: HiscoreMap = observable.map();

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	public async loadHiscore(): Promise<void> {
		const hiScore: IHiscore[] = await this.rootStore.services
			.titlePageService.getUserPlayData();

		for(const data of hiScore) {
			this.hiscore.set(data.id, new HiscoreModel(data));
		}
	}

}