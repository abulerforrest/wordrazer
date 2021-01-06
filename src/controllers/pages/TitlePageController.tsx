import { observable } from 'mobx';

import { RootStore } from '../../stores/RootStore';
import { GamePageStore } from '../../stores/GamePageStore';

import { ITitlePageController } from '../../interfaces/pages';

export class TitlePageController implements ITitlePageController {
  private readonly rootStore: RootStore;
  private readonly store: GamePageStore;

  @observable public loading = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    this.store = rootStore.gamePageStore;

    this.load();
  }

  private async load(): Promise<void> {
    this.loading = true;

    try {
      // eslint-disable-next-line no-empty
    } catch (error) {
    } finally {
      this.loading = false;
    }
  }
}
