import { action, observable } from "mobx";
import { WordsModel } from "../../models/WordsModel";
import { RootStore } from "../../stores/RootStore";

import {
	IWordController
} from "../../interfaces/gamelogic";

export class WordController
	implements IWordController {

	@observable rootStore: RootStore;
	@observable wordController: IWordController;
	@observable model: WordsModel;

	constructor(rootStore: RootStore, wordController: IWordController, model: WordsModel) {
		this.model = model;
		this.rootStore = rootStore;
		this.wordController = wordController;
	}

}