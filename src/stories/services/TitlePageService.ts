import { ITitlePageService } from "../../../src/interfaces/services";
import { IHiscore } from "../../interfaces/Hiscore";

import { delay } from "../../utils/delay";

export class TitlePageService implements ITitlePageService {

	public async getUserPlayData(): Promise<IHiscore[]> {

		delay(5000);

		return [{
			id: 1,
			rank: 1,
			name: "Alex",
			score: 5000
		}];

	}

}