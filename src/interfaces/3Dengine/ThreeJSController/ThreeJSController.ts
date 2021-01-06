export interface IThreeJSController {
  gameHasStarted: boolean;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  cameraJumpIntensity: number;
  showBackground: boolean;
  enableCameraJump: boolean;
  showStarfield: boolean;
  backgroundURL: string;
  animationSpeed: number;
  draw: () => void;
  setup: () => void;
  loadFont: (fontName: string) => void;
  onWindowResize: () => void;
  startGameAnimation: (speed: number) => void;
  addWordToScene: () => void;
  renderStage: () => void;
}
