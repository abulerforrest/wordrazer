import { 
	action, 
	observable
} from "mobx";

import { Model } from "./Model";
import { IPlayer } from "../interfaces/Player";
import { IHiscore } from "../interfaces/Hiscore";

export type PlayerModelPartial = Model<IPlayer, "name" | "hiscore">;

export class PlayerModel implements PlayerModelPartial {

	@observable public id: number = null!;
	@observable public name: string = "";
	@observable public hiscore: IHiscore = null!;
	
	constructor(player?: Partial<IPlayer>) {
		this.fromJson(player!)
	}

	@action
	public fromJson(player: Partial<IPlayer>): void {

		if(player) {
			this.id = player.id!;
			this.name = player.name!;
			this.hiscore = player.hiscore!;
		}

	}

	public toJson(): PlayerModelPartial {

		return {
			name: this.name,
			hiscore: this.hiscore
		}
	}
}