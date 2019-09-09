import { IServices } from "../services/createServices";
import { GamePageStore } from "./GamePageStore";
import { TitlePageStore } from "./TitlePageStore";

export class RootStore {

	public readonly services: IServices;
	public readonly gamePageStore: GamePageStore;
	public readonly titlePageStore: TitlePageStore;

	constructor(services: IServices) {

		this.services = services;
		this.gamePageStore = new GamePageStore(this);
		this.titlePageStore = new TitlePageStore(this);

	}

}