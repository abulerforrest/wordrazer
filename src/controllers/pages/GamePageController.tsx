import { action, autorun, computed, observable, IObservableArray } from 'mobx';

import { createViewModel, IViewModel } from 'mobx-utils';
import { PlayerModel } from '../../models/PlayerModel';

import { RootStore } from '../../stores/RootStore';
import { GamePageStore } from '../../stores/GamePageStore';

import { IGamePageController } from '../../interfaces/pages/GamePageController';

import { WordController } from '../gamelogic/WordController';
import { WordsModel } from '../../models/WordsModel';
import { IWordController } from '../../interfaces/gamelogic';
import { controlledChars } from '../../utils/keyCodes';
import { ThreeJSController } from '../3Dengine/ThreeJSController';
import { IThreeJSController } from '../../interfaces/3Dengine/ThreeJSController';

export class GamePageController extends ThreeJSController implements IGamePageController {
  private readonly rootStore: RootStore;
  private readonly store: GamePageStore;
  private readonly threeJSController: IThreeJSController;

  @observable private readonly model: PlayerModel;
  @observable private allWordControllers: IObservableArray<IWordController> = observable([]);
  @observable public activeWordController: IWordController = [];

  @observable public loading = false;

  @observable private minNameLength = 2;
  @observable private maxNameLength = 30;
  @observable public countDownNumber = 0;

  @observable public keyInput = '';
  @observable public gameCurrentTime = '';
  @observable public currentTextInput = '';

  @observable public timer: any = null;
  @observable public errorMessages: any = null;
  @observable public viewModel: PlayerModel & IViewModel<PlayerModel>;
  @observable public gameStartedTime: any = new Date();

  @observable public gameIsOngoing = false;
  @observable public gameHasStarted = false;
  @observable public runBackgroundAnim = false;
  @observable public showPlayerRegistration = true;

  constructor(rootStore: RootStore, threeJSController: IThreeJSController) {
    super();

    this.rootStore = rootStore;
    this.threeJSController = threeJSController;

    this.store = rootStore.gamePageStore;

    this.model = new PlayerModel();
    this.viewModel = createViewModel(this.model);

    this.errorMessages = {
      0: `Cannot exceed ${this.maxNameLength} characters.`,
      1: `Must be at least ${this.minNameLength} characters in length.`,
      2: 'Accepting letters, numbers [a-z åäö _ !]',
    };

    this.load().then(() => {
      console.log('yah');
    });
  }

  @computed get showTimer(): boolean {
    return this.gameHasStarted && this.countDownNumber === 0;
  }

  @computed get showInputClearIcon(): boolean {
    return this.viewModel.model.name !== '';
  }

  @computed get validateMinTextLength(): boolean {
    const name = this.viewModel.model.name;
    return name.length < this.minNameLength && name.length > 0;
  }

  @computed get validateMaxTextLength(): boolean {
    const name = this.viewModel.model.name;
    return name.length < this.maxNameLength;
  }

  @computed get validateLetterNumberOnly(): boolean {
    const letterNumberOnly = /^([a-zA-Z0-9åäöÅÄÖ!_]+\s)*[a-zA-Z0-9åäöÅÄÖ!_]+$/;
    const name = this.viewModel.model.name;

    return !name.match(letterNumberOnly) && name.length > 0;
  }

  @computed get inputValidated(): boolean {
    return (
      this.validateMaxTextLength &&
      !this.validateMinTextLength &&
      !this.validateLetterNumberOnly &&
      this.viewModel.model.name.length !== 0
    );
  }

  @computed get inputState(): string {
    if (!this.validateMaxTextLength) {
      return 'error';
    } else if (
      !this.validateMinTextLength &&
      !this.validateLetterNumberOnly &&
      this.viewModel.model.name.length >= this.minNameLength
    ) {
      return 'success';
    } else {
      return 'default';
    }
  }

  @computed get getWords(): IWordController {
    return [];
  }

  @computed get textValidateMessage(): string {
    const errors: string[] = [];

    if (this.validateMinTextLength) {
      errors.push(this.errorMessages[1]);
    }
    if (!this.validateMaxTextLength) {
      errors.push(this.errorMessages[0]);
    }
    if (this.validateLetterNumberOnly) {
      errors.push(this.errorMessages[2]);
    }
    return errors.join(' - ');
  }

  private async load(): Promise<void> {
    this.loading = true;

    // side effects
    autorun(() => {
      // init timer
      if (this.showTimer) {
        this.initTimer();
      }

      if (this.gameHasStarted) {
        this.threeJSController.gameHasStarted = true;
        // render stage to the canvas
        this.threeJSController.renderStage();
      }
      if (this.gameHasStarted && this.countDownNumber === 0) {
        // start game animation
        this.threeJSController.startGameAnimation(0.0002);
      }
    });

    try {
      await this.store.fetchWordsFromApi(1000);

      this.store.getWords();

      const wordControllers: IWordController[] = [];

      for (const model of this.store.getWords()) {
        const rowController = this.createWordController(model);
        wordControllers.push(rowController);
      }

      this.allWordControllers.replace(wordControllers);
      // eslint-disable-next-line no-empty
    } catch (error) {
    } finally {
      this.loading = false;
    }
  }

  private createWordController(model: WordsModel): IWordController {
    return new WordController(this.rootStore, this, model);
  }

  @action toggleBackgroundAnim(): void {
    this.runBackgroundAnim = !this.runBackgroundAnim;
  }

  @action
  public initTimer(): void {
    this.timer = setInterval(() => this.updateCurrentTime(), 10);
    this.gameStartedTime = new Date();
    this.gameIsOngoing = true;
  }

  @action
  public clearTimer(): void {
    clearInterval(this.timer);
    this.gameIsOngoing = false;
  }

  @action
  public updateCurrentTime(): void {
    const currentTime: any = new Date();

    const timeElapsed = new Date(currentTime - this.gameStartedTime);

    const min = timeElapsed.getUTCMinutes();
    const sec = timeElapsed.getUTCSeconds();
    const ms = timeElapsed.getUTCMilliseconds();

    this.gameCurrentTime = `${min}:${sec}:${ms}`;
  }

  @action
  public onKeyboardInput(event: KeyboardEvent): void {
    // if the keyCode is not a letter
    if (!controlledChars().includes(event.keyCode)) {
      this.currentTextInput = this.currentTextInput + event.key;
    }
    // update current key
    this.keyInput = event.key;
  }

  @action
  public toggleShowPlayerRegistration(): void {
    this.showPlayerRegistration = !this.showPlayerRegistration;
  }

  @action
  public startGame(): void {
    this.toggleShowPlayerRegistration();
    this.viewModel.submit();
    this.countDownTimer(3);
    this.gameHasStarted = true;
  }

  @action
  public onInputKeypress(value: string): void {
    this.viewModel.model.name = value;
  }

  @action
  public clearInput(type: string): void {
    this.viewModel.reset();
  }

  @action
  public countDownTimer(seconds: number): void {
    this.countDownNumber = seconds;
    setInterval(() => {
      if (this.countDownNumber !== 0) {
        this.countDownNumber = seconds--;
      }
    }, 1000);
  }
}
