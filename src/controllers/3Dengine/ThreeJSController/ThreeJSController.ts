import { IThreeJSController } from '../../../interfaces/3Dengine/ThreeJSController';

import * as THREE from 'three';

import { action, observable } from 'mobx';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import { HalftonePass } from 'three/examples/jsm/postprocessing/HalftonePass';

export class ThreeJSController implements IThreeJSController {
  @observable private scene: THREE.Scene = new THREE.Scene();
  @observable public readonly renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  @observable public readonly composer: EffectComposer = new EffectComposer(this.renderer);
  @observable private instance = 0;

  @observable public camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );

  @observable public gameHasStarted = false;
  @observable private hwSegments = 90;
  @observable private terrain: any = new THREE.Mesh(this.geometry(), this.material());
  @observable private stars: THREE.Mesh[] = [];
  @observable private zoomX = 6; // default: 6
  @observable private zoomY = 18; // default: 18
  @observable private simplex: any = null;
  @observable public noiseIntensity = 1.8;
  @observable public animationSpeed = 0.0;
  @observable public starfieldDelay = 10;
  @observable public showStarfield = true;
  @observable public text: THREE.Mesh = new THREE.Mesh();
  @observable public font: THREE.Font = new THREE.Font(null);

  @observable public cameraPosition: any = {
    x: 0,
    y: -20,
    z: 0,
  };

  @observable public enableCameraJump = true;
  @observable public cameraJumpIntensity = 0.0;
  @observable public showBackground = false;
  @observable public backgroundURL = '../../../assets/img/bg.jpg';

  constructor() {
    this.renderer.setClearColor(0x000000);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  public setup(): void {
    this.initNoise();
    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.initTerrain();
    this.initLights();
    if (this.showStarfield) {
      this.initStarfield();
    }
    this.initAfterEffects();
  }

  @action
  public renderStage(): void {
    if (this.gameHasStarted) {
      this.draw();
    }
  }

  @action
  public onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  @action
  public startGameAnimation(speed: number): void {
    this.animationSpeed = speed;
    this.showStarfield = true;
  }

  @action
  private initStarfield(): void {
    for (let z = -1000; z < 1000; z += 20) {
      const geometry = new THREE.SphereGeometry(0.5, 32, 32);

      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

      const sphere = new THREE.Mesh(geometry, material);

      sphere.position.x = Math.random() * 1500 - 500;
      sphere.position.y = Math.random() * 1500 - 500;
      sphere.position.z = z;
      sphere.scale.x = sphere.scale.y = 2;

      this.scene.add(sphere);
      this.stars.push(sphere);
    }
  }

  private randAfterEffect(
    startDelayMs: number,
    effect: any,
    composer: EffectComposer,
    intervalApproxMs: number,
    durationApproxMs: number,
  ): void {
    const pass = effect;

    const addEffect = () => {
      if (this.gameHasStarted) {
        const addEffectMs = Math.floor(
          Math.random() * (intervalApproxMs - intervalApproxMs / 2 + 1),
        );
        const removeEffectMs = Math.floor(
          Math.random() * (durationApproxMs - durationApproxMs / 2 + 1),
        );
        composer.removePass(pass);
        composer.addPass(pass);
        setTimeout(function () {
          composer.removePass(pass);
        }, removeEffectMs);
        clearInterval(timer);
        timer = setInterval(addEffect, addEffectMs);
      }
    };
    let timer: NodeJS.Timeout = setInterval(addEffect, startDelayMs);
  }

  private initAfterEffects(): void {
    // --- setup
    const renderScene = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderScene);
    this.composer.setSize(window.innerWidth, window.innerHeight);
    // --- init glitch effect
    const glitchPass = new GlitchPass();
    // --- halftone effect
    const halftonePass = new HalftonePass(window.innerWidth, window.innerHeight, {
      shape: 1,
      radius: 1,
      rotateR: Math.PI / 12,
      rotateB: (Math.PI / 12) * 2,
      rotateG: (Math.PI / 12) * 3,
      scatter: 0,
      blending: 0.2,
      blendingMode: 0.5,
      greyscale: false,
      disable: false,
    });
    // --- init bloom effect
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.8,
      0.1,
      0,
    );
    this.composer.addPass(bloomPass);
    // --- init FXAA shader
    const effectFXAA = new ShaderPass(FXAAShader);
    effectFXAA.uniforms['resolution'].value.x =
      1 / (window.innerWidth * this.renderer.getPixelRatio());
    effectFXAA.uniforms['resolution'].value.y =
      1 / (window.innerHeight * this.renderer.getPixelRatio());
    // --- apply the effects
    this.composer.addPass(halftonePass);
    this.randAfterEffect(25000, glitchPass, this.composer, 60000, 2000);
    this.composer.addPass(effectFXAA);
  }

  private initLights(): void {
    const ambientLight = new THREE.AmbientLight(0xff00de);
    ambientLight.intensity = 4;
    ambientLight.color = new THREE.Color(0xff00de);
    this.scene.add(ambientLight);
  }

  private initScene(): void {
    this.scene = new THREE.Scene();
    const loader = new THREE.TextureLoader();

    if (this.showBackground && this.backgroundURL !== '') {
      this.scene.background = loader.load(this.backgroundURL);
    }
  }

  private initCamera(): void {
    this.camera.position.x = this.cameraPosition.x;
    this.camera.position.y = this.cameraPosition.y;
    this.camera.position.z = this.cameraPosition.z;

    const controls = new OrbitControls(this.camera, this.renderer.domElement);

    controls.enablePan = false;
    controls.enableKeys = false;
    controls.enableZoom = false;
    controls.enableRotate = false;
  }

  @action
  private initRenderer(): void {
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.toneMappingExposure = Math.pow(4.0, 4.0);
  }

  @action
  private starField(): void {
    if (this.animationSpeed > 0) {
      for (let i = 0; i < this.stars.length; i++) {
        const star = this.stars[i];
        star.position.z += i / this.starfieldDelay;

        if (star.position.z > 1000) {
          star.position.z -= 2000;
        }
      }
    }
  }

  @action
  public draw(): void {
    this.instance = requestAnimationFrame(this.draw.bind(this));
    this.renderer.autoClear = false;
    this.renderer.clear();

    const offset = Date.now() * this.animationSpeed * 3;

    this.starField();
    this.adjustVertices(offset);
    this.adjustCameraPos(offset);
    this.renderer.clearDepth();
    this.composer.render();
  }

  public stop(): void {
    cancelAnimationFrame(this.instance);
  }

  @action
  private initNoise() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const SimplexNoise = require('simplex-noise');
    this.simplex = new SimplexNoise();
  }

  @action
  private adjustVertices(offset: number): void {
    let inc;
    for (let i = 0; i < this.terrain.geometry.vertices.length; i++) {
      this.terrain.geometry.vertices[i].inc += 0.151;
      inc = this.terrain.geometry.vertices[i].inc;
      this.terrain.geometry.vertices[i].scl =
        Math.cos(inc) * this.terrain.geometry.vertices[i].seed;
      this.terrain.geometry.vertices[i].z = this.terrain.geometry.vertices[i].scl;
      const vertex = this.terrain.geometry.vertices[i];
      const x = vertex.x / this.zoomX;
      const y = vertex.y / this.zoomY;
      vertex.z = this.simplex.noise2D(x, y + offset) * this.noiseIntensity;
    }
    this.terrain.geometry.verticesNeedUpdate = true;
    this.terrain.geometry.computeVertexNormals();
  }

  @action
  private adjustCameraPos(offset: number) {
    if (this.enableCameraJump) {
      const x = this.camera.position.x / this.zoomX;
      const y = this.camera.position.y / this.zoomY;
      const noise = this.simplex.noise2D(x, y + offset) * this.cameraJumpIntensity;
      this.camera.position.z = noise + 3.4;
    }
  }

  private geometry(): THREE.PlaneGeometry {
    return new THREE.PlaneGeometry(40, 40, this.hwSegments, this.hwSegments);
  }

  private material(): THREE.MeshPhongMaterial {
    return new THREE.MeshPhongMaterial({
      color: 0xe731ee,
      opacity: 1,
      // lights: true,
      specular: 0xffffff,
      blending: THREE.AdditiveBlending,
      flatShading: true,
      side: THREE.FrontSide,
      transparent: true,
      depthTest: false,
      wireframe: true,
      emissive: 0xe731ee,
    });
  }

  @action
  public randNum(n: number) {
    const p =
      (Math.random() +
        Math.random() +
        Math.random() +
        Math.random() +
        Math.random() +
        Math.random() -
        3) /
      3;
    return p * n;
  }

  @action
  private initTerrain(): void {
    this.terrain.castShadow = true;
    this.terrain.receiveShadow = true;
    this.scene.add(this.terrain);
  }

  @action
  public addWordToScene(): void {
    /*
			const word: string = "atari";

			const letterMeshes: THREE.Mesh[] = [];

			const material =  new THREE.MeshBasicMaterial({color: 0xffffff});

			let offset: number = 1;

			for(let i = 0; i < word.length; i++) {

			let letter = word[i];

			let textMesh = new THREE.Mesh(new THREE.TextGeometry(letter, {
				font: this.font,
				size: 2.0,
				height: .2,
				curveSegments: 12,

				bevelThickness: 0.5,
				bevelSize: 0.2,

			}), material);

			textMesh.position.z += 10;
			textMesh.rotateX(20.5);
			textMesh.position.y += 0;
			textMesh.position.x += offset - 30;

			this.scene.add(textMesh)
			offset = offset + 3.2;
		}
*/
  }

  @action
  public async loadFont(fontName: string): Promise<void> {
    const loader = new THREE.FontLoader();

    loader.load(
      'https://threejs.org/examples/fonts/' + fontName,
      (font) => {
        console.log('font loaded ok!');

        // declare font
        this.font = font;
      },
      (xhr) => {
        // console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
      },
      (err) => {
        console.log('An error happened: ' + err);
      },
    );
  }
}
