import { 
	action, 
	observable
} from "mobx";

import { Model } from "./Model";
import { IHiscore } from "../interfaces/Hiscore";

export type HiscoreModelPartial = Model<IHiscore, "rank">;

export class HiscoreModel implements HiscoreModelPartial {

	@observable public id: number = null!;
	@observable public rank: number = null!;
	
	constructor(hiScore?: Partial<IHiscore>) {
		this.fromJson(hiScore!)
	}

	@action
	public fromJson(hiScore: Partial<IHiscore>): void {

		if(hiScore) {
			this.id = hiScore.id!;
			this.rank = hiScore.rank!;
		}

	}

	public toJson(): HiscoreModelPartial {

		return {
			rank: this.rank
		}
	}
}