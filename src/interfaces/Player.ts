import { Identifiable } from "./Identifiable";
import { IHiscore } from "./Hiscore";

export interface IPlayer extends Identifiable {
	id: number;
	name: string;
	hiscore: IHiscore;
}