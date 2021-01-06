import { ITitlePageService } from '../../interfaces';
import { IHiscore } from '../../interfaces/Hiscore';

import { delay } from '../../utils/delay';

export class TitlePageService implements ITitlePageService {
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
