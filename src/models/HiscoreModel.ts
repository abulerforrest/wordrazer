import { action, observable } from 'mobx';

import { Model } from './Model';
import { IHiscore } from '../interfaces/Hiscore';

export type HiscoreModelPartial = Model<IHiscore, 'rank'>;

export class HiscoreModel implements HiscoreModelPartial {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  @observable public id: number = null!;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  @observable public rank: number = null!;

  constructor(hiScore?: Partial<IHiscore>) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.fromJson(hiScore!);
  }

  @action
  public fromJson(hiScore: Partial<IHiscore>): void {
    if (hiScore) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.id = hiScore.id!;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.rank = hiScore.rank!;
    }
  }

  public toJson(): HiscoreModelPartial {
    return {
      rank: this.rank,
    };
  }
}
