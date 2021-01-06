import { IWord } from '../Word';

export interface IGamePageService {
  fetchWordsFromApi(count: number): Promise<IWord[]>;
}
