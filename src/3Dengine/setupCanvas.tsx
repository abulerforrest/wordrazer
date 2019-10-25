import * as THREE from "three";

export const canvas = () => {

	const renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );

	return renderer;
}