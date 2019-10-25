import {
	IThreeJSController
} from "../../../interfaces/3Dengine/ThreeJSController";

import * as THREE from "three";

import { observable, action } from "mobx";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class ThreeJSController
	implements IThreeJSController {

		@observable private scene: THREE.Scene = new THREE.Scene();
		@observable public readonly renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer(
			{ antialias: true }
		);
		@observable public camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth/window.innerHeight,
			0.1, 1000
		);

		@observable private hwSegments: number = 90;
		@observable private terrain: any = new THREE.Mesh(this.geometry(), this.material());
		@observable private stars: THREE.Mesh[] = [];
		@observable private zoomX: number = 6; // default: 6
		@observable private zoomY: number = 18; // default: 18
		@observable private simplex: any = null;
		@observable public noiseIntensity: number = 1.8;
		@observable public animationSpeed: number = 0.0000;
		@observable public starfieldDelay: number = 10;
		@observable public showStarfield: boolean = true;
		@observable public text: THREE.Mesh = new THREE.Mesh();
		@observable public font: THREE.Font = new THREE.Font(null);

		@observable public cameraPosition: any = {
			x: 0,
			y: -20,
			z: 3
		}
	
		@observable public enableCameraJump: boolean = true;
		@observable public cameraJumpIntensity: number = 0.0;
		@observable public showBackground: boolean = false;
		@observable public backgroundURL: string = "../../../assets/img/bg.jpg";

	constructor() {
		this.renderer.setClearColor(0x000000);
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}

	public setup() : void {
		this.initNoise();
		this.initScene();
		this.initCamera();
		this.initRenderer();
		this.initTerrain();
		this.initLights();

		if(this.showStarfield) {
			this.initStarfield();
		}
	}

	@action
	public onWindowResize() : void {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}

	@action
	public startGameAnimation(speed: number) : void {
		this.animationSpeed = speed;
		this.showStarfield = true;
	}

	@action
	private initStarfield() : void {
		for(let z = -1000; z < 1000; z += 20) {
	
			const geometry = new THREE.SphereGeometry(0.5, 32, 32);
			
			const material = new THREE.MeshBasicMaterial(
				{color: 0xffffff}
			);
			
			const sphere = new THREE.Mesh(geometry, material);

			sphere.position.x = Math.random() * 1500 - 500;
			sphere.position.y = Math.random() * 1500 - 500;
			sphere.position.z = z;
			sphere.scale.x = sphere.scale.y = 2;

			this.scene.add(sphere);
			this.stars.push(sphere);
		}
	}

	private initLights() : void {
		const ambientLight = new THREE.AmbientLight(0xFF00DE);
		ambientLight.intensity = 4;
		ambientLight.color = new THREE.Color(0xFF00DE);
		this.scene.add(ambientLight);
	}

	private initScene() : void {
		this.scene = new THREE.Scene();
		const loader = new THREE.TextureLoader();
		
		if(this.showBackground && this.backgroundURL !== "") {
			const bg = loader.load(this.backgroundURL);
			this.scene.background = bg;
		}
	}

	private initCamera() : void {

		this.camera.position.x = this.cameraPosition.x;
		this.camera.position.y = this.cameraPosition.y;
		this.camera.position.z = this.cameraPosition.z;
		
		let controls = new OrbitControls(this.camera);

		controls.enablePan = false;
		controls.enableKeys = false;
		controls.enableZoom = false;
		controls.enableRotate = false;
	  }

	@action
	private initRenderer() : void {
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}

	@action
	private starField() : void {

		if(this.animationSpeed > 0) { 

			for(let i = 0; i < this.stars.length; i++) {
				const star = this.stars[i]; 
				star.position.z +=  i/this.starfieldDelay;

				if(star.position.z > 1000) {
					star.position.z -= 2000;
				}
			}

		}

	}

	@action
	public draw() : void {

		requestAnimationFrame(this.draw.bind(this));

		let offset = Date.now() * this.animationSpeed;

		this.starField();
		this.adjustVertices(offset);
		this.adjustCameraPos(offset);
		
		this.renderer.render( this.scene,  this.camera);			  
	}

	@action
	private initNoise() {
		const SimplexNoise = require('simplex-noise');
		this.simplex = new SimplexNoise();
	}

	@action
	private adjustVertices(offset: number) : void {
		var inc;
		for (let i=0; i < this.terrain.geometry.vertices.length;i++){
		  this.terrain.geometry.vertices[i].inc+=0.151;
		  inc = this.terrain.geometry.vertices[i].inc;
		  this.terrain.geometry.vertices[i].scl = Math.cos(inc)*this.terrain.geometry.vertices[i].seed;
		  this.terrain.geometry.vertices[i].z=this.terrain.geometry.vertices[i].scl;
		  let vertex = this.terrain.geometry.vertices[i];
		  let x = vertex.x / this.zoomX;
		  let y = vertex.y / this.zoomY;
		  let noise = this.simplex.noise2D(x, y + offset) * this.noiseIntensity; 
		  vertex.z = noise;	
		/*
		for (let i = 0; i < this.terrain.geometry.vertices.length; i++) {
		  let vertex = this.terrain.geometry.vertices[i];
		  let x = vertex.x / this.zoomX;
		  let y = vertex.y / this.zoomY;
		  let noise = this.simplex.noise2D(x, y + offset) * this.noiseIntensity; 
		  vertex.z = noise;
		}
		*/
		}
		this.terrain.geometry.verticesNeedUpdate = true;
		this.terrain.geometry.computeVertexNormals();
	}

	@action
	private adjustCameraPos(offset: number) {
		if(this.enableCameraJump) {
			const x = this.camera.position.x / this.zoomX;
			const y = this.camera.position.y / this.zoomY;
			const noise = this.simplex.noise2D(x, y + offset) * this.cameraJumpIntensity;
			this.camera.position.z = noise + 3.4;
		}
	}

	private geometry() : THREE.PlaneGeometry {
		return new THREE.PlaneGeometry(40, 40, this.hwSegments, this.hwSegments);
	}

	private material() : THREE.MeshPhongMaterial {
		return new THREE.MeshPhongMaterial({
			color: 0xE731EE,
			opacity: 1,
			lights: true,
			specular: 0xffffff,
			blending: THREE.AdditiveBlending,
			flatShading: true,
			side: THREE.FrontSide,
			transparent: false,
			depthTest: false,
			wireframe: true,
			emissive: 0xE731EE
		});
	}

	@action
	public randNum(n: number){
		var p = ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3;
		return p*n;
	  }

	@action
	private initTerrain() : void {
		this.terrain.castShadow = true;
		this.terrain.receiveShadow = true;
		this.scene.add(this.terrain);
	}

	@action
		public addWordToScene() : void {
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
	public async loadFont(fontName: string) : Promise<void> {

		const loader = new THREE.FontLoader();
			
		loader.load("https://threejs.org/examples/fonts/" + fontName, (font) => {
		
		console.log("font loaded ok!");

		// declare font
		this.font = font;

	},
		(xhr) => {
		// console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
		},
		(err) => {
			console.log( 'An error happened: ' + err);
		},

		);

	}
	

}