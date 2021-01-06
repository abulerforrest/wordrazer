import { IWordController } from '../gamelogic';

export interface IGamePageController {
  showTimer: boolean;
  gameIsOngoing: boolean;
  inputValidated: boolean;
  gameHasStarted: boolean;
  runBackgroundAnim: boolean;
  showInputClearIcon: boolean;
  showPlayerRegistration: boolean;
  keyInput: string;
  inputState: string;
  gameCurrentTime: string;
  currentTextInput: string;
  textValidateMessage: string;
  countDownNumber: number;
  viewModel: any;
  clearInput: (type: string) => void;
  toggleShowPlayerRegistration: () => void;
  startGame: () => void;
  initTimer: () => void;
  clearTimer: () => void;
  countDownTimer: (seconds: number) => void;
  updateCurrentTime: () => void;
  toggleBackgroundAnim: () => void;
  onInputKeypress: (value: string) => void;
  onKeyboardInput: (event: KeyboardEvent) => void;
  getWords: IWordController;
  activeWordController: IWordController;
}
