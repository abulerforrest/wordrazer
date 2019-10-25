import { 
	action, 
	observable
} from "mobx";

import { Model } from "./Model";
import { IPlayer } from "../interfaces/Player";

export type PlayerModelPartial = Model<IPlayer, "name" | "level" | "lives" | "gameTime" | "score">;

export class PlayerModel implements PlayerModelPartial {

	@observable public id: number = null!;
	@observable public name: string = "";
	@observable public gameTime?: Date;
	@observable public level?: Number = 0;
	@observable public lives?: Number = 0;
	@observable public score?: Number = 0;
	public localValues!: any;
	public localComputedValues: any;
	
	constructor(player?: Partial<IPlayer>) {
		this.fromJson(player!)
	}

	@action
	public fromJson(player: Partial<IPlayer>): void {

		if(player) {
			this.id = player.id!;
			this.name = player.name!;
			this.level = player.level!;
			this.lives = player.lives!;
			this.score = player.score!;
			this.gameTime = player.gameTime!;
		}

	}

	public toJson(): PlayerModelPartial {

		return {
			name: this.name,
			level: this.level,
			lives: this.lives,
			score: this.score,
			gameTime: this.gameTime
		}
	}
}