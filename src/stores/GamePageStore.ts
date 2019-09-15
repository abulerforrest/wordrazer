import { RootStore } from "./RootStore";
import { observable, ObservableMap, action } from "mobx";
import { WordsModel } from "../models/WordsModel";
import { IWord } from "../interfaces/Word";

type WordsMap = ObservableMap<IWord, WordsModel>

export class GamePageStore {

	private readonly rootStore: RootStore;
	private readonly words: WordsMap = observable.map();

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	@action
	public async fetchWordsFromApi(count: number) : Promise<void> {

		const words: IWord[] = await this.rootStore.services
		.gamePageService.fetchWordsFromApi(count);

		console.log(words)

		words.forEach((word, index) => {

			const wordsModel = new WordsModel(word, index);

//			console.log(wordsModel)

			this.words.set(word, wordsModel);
		});

	}

	public getWords() : IterableIterator<WordsModel> {
		console.log(this.words)
		return this.words.values();
	}


}