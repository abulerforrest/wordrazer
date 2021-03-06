import { IGamePageService } from '../../../src/interfaces/services';
import { IHiscore } from '../../interfaces/Hiscore';

import { delay } from '../../utils/delay';
import { IWord } from '../../interfaces/Word';

export class GamePageService implements IGamePageService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async fetchWordsFromApi(count: number): Promise<IWord[]> {
    return [];
  }

  public async getUserPlayData(): Promise<IHiscore[]> {
    delay(5000);

    return [
      {
        id: 1,
        rank: 1,
      },
    ];
  }
}
