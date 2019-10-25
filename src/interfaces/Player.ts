import { Identifiable } from "./Identifiable";

export interface IPlayer extends Identifiable {
	name: string;
	gameTime?: Date;
	level?: Number;
	score?: Number;
	lives?: Number;
}