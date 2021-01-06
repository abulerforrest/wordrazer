import { IHiscore } from '../interfaces/Hiscore';

import { ITitlePageService } from '../interfaces';

export class TitlePageService implements ITitlePageService {
  public async getUserPlayData(): Promise<IHiscore[]> {
    return null as any;
  }
}
