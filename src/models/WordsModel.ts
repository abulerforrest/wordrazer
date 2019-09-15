import { 
	action, 
	observable
} from "mobx";

import { Model } from "./Model";
import { IWord } from "../interfaces/Word";

export type WordsModelPartial = Model<IWord, "word">;

export class WordsModel implements WordsModelPartial {

	@observable public id = 0;
	@observable public word: string = "";

	constructor(word?: Partial<IWord>, index?: number) {
		this.fromJson(word!)
	}

	@action
	public fromJson(word: Partial<IWord>): void {

		if(word) {
			this.id = word.id!;
			this.word = word.word!;
		}

	}

	public toJson(): WordsModelPartial {
		return {
			word: this.word
		}
	}
}