import { 
	action,
	autorun,
	computed, 
	observable
} from "mobx";

import { createViewModel } from "mobx-utils";
import { PlayerModel } from "../../models/PlayerModel";

import { RootStore } from "../../stores/RootStore";
import { GamePageStore } from "../../stores/GamePageStore";

import {
	IGamePageController
} from "../../interfaces/pages/GamePageController";

export class GamePageController
	implements IGamePageController {

	private readonly rootStore: RootStore;
	private readonly store: GamePageStore;

	@observable public loading: boolean = false;

	@observable private model: PlayerModel;

	@observable private minNameLength: number = 2;
	@observable private maxNameLength: number = 30;
	@observable public countDownNumber: number = 0;

	@observable public textInput: string = "";
	@observable public gameCurrentTime: string = "";
	
	@observable public timer: any = null;
	@observable public errorMessages: any = null;
	@observable public viewModel: any = null;
	@observable public gameStartedTime: any = new Date();
	
	@observable public gameIsOngoing: boolean = false;
	@observable public gameHasStarted: boolean = false;
	@observable public runBackgroundAnim: boolean = false;
	@observable public showPlayerRegistration: boolean = true;
	
	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;

		this.store = rootStore.gamePageStore;

		this.model = new PlayerModel();
		this.viewModel = createViewModel(this.model);

		this.errorMessages = {
			0: `Cannot exceed ${this.maxNameLength} characters.`,
			1: `Must be at least ${this.minNameLength} characters in length.`,
			2: "Accepting letters, numbers [a-z åäö _ !]"
		}

		this.load();
	}

	@computed get showTimer(): boolean {
		return this.gameHasStarted && this.countDownNumber === 0;
	}

	@computed get showInputClearIcon() : boolean {
		return this.viewModel.name;
	}

	@computed get validateMinTextLength() : boolean {
		const name = this.viewModel.name;
		return name.length < this.minNameLength && name.length > 0;
	}

	@computed get validateMaxTextLength() : boolean {
		const name = this.viewModel.name;
		return name.length < this.maxNameLength;
	}

	@computed get validateLetterNumberOnly() : boolean {
		const letterNumberOnly = /^([a-zA-Z0-9åäöÅÄÖ!_]+\s)*[a-zA-Z0-9åäöÅÄÖ!_]+$/;
		const name = this.viewModel.name;

		return !name.match(letterNumberOnly) && name.length > 0;
	}

	@computed get inputValidated() : boolean {
		return this.validateMaxTextLength
			&& !this.validateMinTextLength
			&& !this.validateLetterNumberOnly
			&& this.viewModel.name.length !== 0;
	}

	@computed get inputState() : string {
		if(!this.validateMaxTextLength) {
			return "error";
		} 
		else if(!this.validateMinTextLength
			&& !this.validateLetterNumberOnly
			&& this.viewModel.name.length >= this.minNameLength
		) {
			return "success";
		}
		else {
			return "default";
		}
	}

	@computed get textValidateMessage() : string {
		const errors: string[] = [];

		if(this.validateMinTextLength) {
			errors.push(this.errorMessages[1]);
		}
		if(!this.validateMaxTextLength) {
			errors.push(this.errorMessages[0]);
		}
		if(this.validateLetterNumberOnly) {
			errors.push(this.errorMessages[2]);
		}
		return errors.join(" - ");
	}

	private async load() : Promise<void> {
		this.loading = true;

		// Side effects
		autorun(
			() => {
				// init Timer
				if(this.showTimer === true) {
					this.initTimer();
					this.toggleBackgroundAnim();
				}
				// if game has ended reset timer and stop background anim...

			}
		);
			
		try {

			await this.store.fetchWordsFromApi(1000);

			const wordRowControllers: any[] = [];

			console.log(this.store.getWords())

		}
		catch(error) {

		}
		finally {
			this.loading = false;
		}
	}

	@action toggleBackgroundAnim() : void {
		this.runBackgroundAnim = !this.runBackgroundAnim;
	}

	@action
	public initTimer() : void {
		this.timer = setInterval(() => this.updateCurrentTime(), 10);
		this.gameStartedTime = new Date();
		this.gameIsOngoing = true;
	}

	@action
	public clearTimer() : void {
		clearInterval(this.timer);
		this.gameIsOngoing = false;
	}

	@action
	public updateCurrentTime() : void {
		
		const currentTime: any = new Date();

		const timeElapsed = new Date(currentTime - this.gameStartedTime);
		
		const min = timeElapsed.getUTCMinutes();
		const sec = timeElapsed.getUTCSeconds();
		const ms = timeElapsed.getUTCMilliseconds();

		this.gameCurrentTime = `${min}:${sec}:${ms}`;

	}

	@action
	public onKeyboardInput(event: KeyboardEvent): void {
		this.textInput = event.key;
	}

	@action
	public toggleShowPlayerRegistration() : void {
		this.showPlayerRegistration = !this.showPlayerRegistration;
	}

	@action
	public startGame() : void {
		this.toggleShowPlayerRegistration();
		this.countDownTimer(3);
		this.gameHasStarted = true;
	}

	@action
	public onInputKeypress(value: string) : void {
		this.viewModel.name = value;
	}

	@action
	public clearInput(type: string) : void {
		this.viewModel[type] = "";
	}

	@action
	public countDownTimer(seconds: number) : void {
		this.countDownNumber = seconds;
			setInterval(() => {
				if(this.countDownNumber !== 0) {
					this.countDownNumber = seconds--;
				}
			}, 1000);
	}

}