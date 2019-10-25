import { GamePageService } from "./GamePageService";
import { TitlePageService } from "./TitlePageService";

import {
	IGamePageService,
	ITitlePageService
} from "../interfaces/services";

export interface IServices {
	gamePageService: IGamePageService
	titlePageService: ITitlePageService
}

export const createServices = () : IServices => {

	return {
		gamePageService: new GamePageService(),
		titlePageService: new TitlePageService()
	}

};