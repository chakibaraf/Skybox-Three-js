import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


//mise en place de la scene plus la camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth/window.innerHeight,45,30000);
camera.position.set(900,200,900);

//mise en place du webgl avec rendu dom body et antialias pour avec une texture lisse
const renderer = new THREE.WebGL1Renderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

//permet de controler les directions avec zoom
let controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change',renderer);
//limit l'action du zoom max etr min
controls.minDistance = 800;
controls.maxDistance =3500;

//tableau pour y mettre la texture de l'image
let materialArray = [];
let texture_droite= new THREE.TextureLoader().load('./assets/droite.jpg');
let texture_gauche = new THREE.TextureLoader().load('./assets/gauche.jpg');
let texture_bas = new THREE.TextureLoader().load('./assets/bas.jpg');
let texture_haut = new THREE.TextureLoader().load('./assets/haut.jpg');
let texture_arriere = new THREE.TextureLoader().load('./assets/arriere.jpg');
let texture_devant = new THREE.TextureLoader().load('./assets/devant.jpg');

//ajout de la texture dans le material
/*1*/materialArray.push(new THREE.MeshBasicMaterial({map: texture_droite}));
/*2*/materialArray.push(new THREE.MeshBasicMaterial({map: texture_gauche}));
/*3*/materialArray.push(new THREE.MeshBasicMaterial({map: texture_haut}));
/*4*/materialArray.push(new THREE.MeshBasicMaterial({map: texture_bas}));
/*5*/materialArray.push(new THREE.MeshBasicMaterial({map: texture_arriere}));
/*6*/materialArray.push(new THREE.MeshBasicMaterial({map: texture_devant}));

//boucle pour imprimer la texture sur les 6 cotés de la face de la box avec backside 
for (let i = 0 ; i<6 ;i++){
    materialArray[i].side = THREE.BackSide;
}

//mise en place de lq box avec ses dimmension et ajout du mesh (material et geometrie)
let skyboxGeo = new THREE.BoxGeometry(10000,10000,10000);
let skybox = new THREE.Mesh(skyboxGeo,materialArray);
console.log(skybox);
scene.add(skybox);

//fonction d'animation du rendu
function animate(){
    renderer.render(scene ,camera);
    requestAnimationFrame(animate);
}

animate();