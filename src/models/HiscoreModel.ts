import { 
	action, 
	observable
} from "mobx";

import { Model } from "./Model";
import { IHiscore } from "../interfaces/Hiscore";

export type HiscoreModelPartial = Model<IHiscore, "rank" | "name" | "score">;

export class HiscoreModel implements HiscoreModelPartial {

	@observable public id: number = 0;
	@observable public rank: number = 0;
	@observable public score: number = 0;
	@observable public name: string = "";
	
	constructor(hiScore?: Partial<IHiscore>) {
		this.fromJson(hiScore!)
	}

	@action
	public fromJson(hiScore: Partial<IHiscore>): void {

		if(hiScore) {
			this.id = hiScore.id!;
			this.name = hiScore.name!;
			this.rank = hiScore.rank!;
			this.score = hiScore.score!;
		}

	}

	public toJson(): HiscoreModelPartial {

		return {
			name: this.name,
			rank: this.rank,
			score: this.score
		}
	}
}