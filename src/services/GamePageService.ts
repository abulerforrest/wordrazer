import {
	IGamePageService
} from "../interfaces/services/GamePageService";

import { IWord } from "../interfaces/Word";

export class GamePageService implements IGamePageService {

	public async fetchWordsFromApi(count: number): Promise<IWord[]> {

		let response: IWord[] = [];

		await fetch("https://random-word-api.herokuapp.com/word?key=LSHH26S3&number=" + count)
		  .then(response => response.json())
		  .then(words => { response =  words; });

		return response;
	}

}