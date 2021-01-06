import { RootStore } from './RootStore';
import { observable, ObservableMap, action } from 'mobx';
import { WordsModel } from '../models/WordsModel';
import { IWord } from '../interfaces/Word';

type WordsMap = ObservableMap<IWord, WordsModel>;

export class GamePageStore {
  private readonly rootStore: RootStore;
  private readonly words: WordsMap = observable.map();

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action
  public async fetchWordsFromApi(count: number): Promise<void> {
    const words: any[] = await this.rootStore.services.gamePageService.fetchWordsFromApi(count);

    for (const word in words) {
      const wordsModel = new WordsModel(words[word]);

      this.words.set(words[word], wordsModel);
    }
  }

  @action
  public getWords(): IterableIterator<WordsModel> {
    return this.words.values();
  }
}
