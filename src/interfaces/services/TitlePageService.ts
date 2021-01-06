import { IHiscore } from '../Hiscore';

export interface ITitlePageService {
  getUserPlayData: () => Promise<IHiscore[]>;
}
