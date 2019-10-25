import { 
	action, 
	observable
} from "mobx";

import { Model } from "./Model";
import { IWord } from "../interfaces/Word";

export type WordsModelPartial = Model<IWord, "_id" | "word">;

export class WordsModel implements WordsModelPartial {

	@observable public _id: string = "";
	@observable public word: string = "";

	constructor(word?: Partial<IWord>) {
		this.fromJson(word!)
	}

	@action
	public fromJson(word: Partial<IWord>): void {

		if(word) {
			this._id = word._id!;
			this.word = word.word!;
		}

	}

	public toJson(): WordsModelPartial {
		return {
			_id: this._id,
			word: this.word
		}
	}
}