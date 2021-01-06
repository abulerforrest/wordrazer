import { IGamePageService } from '../interfaces';

import { IWord } from '../interfaces/Word';

export class GamePageService implements IGamePageService {
  public async fetchWordsFromApi(count: number): Promise<IWord[]> {
    const response: IWord[] = [];
    /* DISABLED
		return fetch("https://retrocomputer-words-api.herokuapp.com/api/v1/words/limit/3")
		.then(response => response.json())
		.then(words => {
			response = [words["word"]][0];
			return response;
		});
*/
    // MOCK
    return [
      {
        word: 'spaceinvaders',
        _id: '5d840540f0f91eaddb96986e',
      },
      {
        word: 'abacuss',
        _id: '5d840540f0f91eaddb96986f',
      },
      {
        word: 'advancements',
        _id: '5d840540f0f91eaddb969932',
      },
      {
        word: 'emulation',
        _id: '5d840540f0f91eaddb969933',
      },
      {
        word: 'adventure',
        _id: '5d840540f0f91eaddb969930',
      },
      {
        word: 'amiga',
        _id: '5d840540f0f91eaddb96992e',
      },
      {
        word: 'levelup',
        _id: '5d840540f0f91eaddb969935',
      },
      {
        word: 'levelup',
        _id: '5d840540f0f91eaddb969929',
      },
      {
        word: 'computer',
        _id: '5d840540f0f91eaddb969928',
      },
      {
        word: 'adrenalin',
        _id: '5d840540f0f91eaddb969927',
      },
    ];
  }
}
