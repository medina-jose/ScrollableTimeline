import * as THREE from './three/three.module.js';
import { FBXLoader } from "./three/FBXLoader.js";
import * as SPLINE from "./spline.js";
import * as MATHUTIL from "./mathUtil.js";

function initScene () {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(80, window.innerWidth/window.innerHeight, .1, 500);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    light.position.set( 0, 200, 0 );
    scene.add( light );

    light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 200, 100 );
    light.castShadow = true;
    light.shadow.camera.top = 180;
    light.shadow.camera.bottom = - 100;
    light.shadow.camera.left = - 120;
    light.shadow.camera.right = 120;
    scene.add( light );
    
    // ground
    var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add( mesh );

    var gridHelper = new THREE.GridHelper( 1000, 50 );
    scene.add( gridHelper );
}

function initObjects () {
    var theta = 0;
    var texture, material, plane

    texture = THREE.ImageUtils.loadTexture("../images/cover.jpg");
    material = new THREE.MeshLambertMaterial({map: texture});

    for(var i=0; i<10000; i+=500)
    {
        let position = SPLINE.getPositionOnSplineRadius(spline, 10000, i, theta, RADIUS);

        plane = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), material);
        plane.material.side = THREE.DoubleSide;
        plane.position.set(position.x, position.y, position.z);
        plane.rotation.y = i * 5;
        plane.callback = function () { console.log(i); }

        // fbxLoader.load(fbxModelPath + "VinylRecord.fbx", function(object) {
        //     object.position.set(position.x, position.y, position.z);
        //     object.scale.set(.4,.4,.4)
        //     object.traverse(function(child) {
        //         if(child instanceof THREE.Mesh) {
        //             var mesh = child;
        //             mesh.material.forEach((material) => {
        //                 if(material.name == "White") {
        //                     material.map = THREE.ImageUtils.loadTexture("../images/cover.jpg");
        //                     material.needsUpdate = true;
        //                 }
        //             });
        //         }
        //     });

        //     recordObjects.push(object);
        //     scene.add(object);
        // });

        recordObjects.push(plane);
        scene.add(plane);

        theta += 30;
    }
}

function addEventListeners() {
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('wheel', onDocumentMouseScroll, false);
    window.addEventListener('click', onDocumentMouseDown, false);
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 2;
    mouseY = (event.clientY - windowHalfY) * 2;
}

function onDocumentMouseDown(event) {
    mouseX = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouseY = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);
    var intersects = raycaster.intersectObjects(recordObjects);

    if(intersects.length > 0) {
        intersects.forEach((intersect) => { intersect.object.callback(); });
    }
}

function onDocumentMouseScroll(event) {
    camPosIndex += event.deltaY / 10;
    console.log("Delta: " + event.deltaY + " Cam Index: " + camPosIndex);
    if(camPosIndex > 10000) { camPosIndex = 0;}
    else if(camPosIndex < 0) { camPosIndex = 1;}
}


function update () {
    renderer.render(scene, camera);
    requestAnimationFrame( update );

    let position = spline.getPoint(camPosIndex / 10000);
    let rotation = spline.getTangent(camPosIndex / 10000);
  
    // move camera along spline
    camera.position.x = position.x;
    camera.position.y = position.y;
    camera.position.z = position.z + 10;
    
    // look at mouse position with easing
    target.x = -mouseX * .03;
    target.y = -mouseY * .03;
    target.z = camera.position.z + 180;
    camera.lookAt(target);

    // rotate record objects
    recordObjects.forEach((recordObject) => {
        recordObject.rotation.y += MATHUTIL.degreesToRadians(.0001);
    });
}

var scene, camera, renderer;
var spline;
var camPosIndex = 0;
const RADIUS = 2000;

var mouseX = 0, mouseY = 0;
var targetX = 0, targetY = 0, targetZ = 0;
var target = new THREE.Vector3();
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var fbxLoader = new FBXLoader();
var fbxModelPath = "../models/fbx/";

var recordObjects = [];
var raycaster = new THREE.Raycaster();

initScene();
addEventListeners();
spline = SPLINE.createSpline();
initObjects();

// tube geometry from spline
var tubeGeo = new THREE.TubeGeometry(spline, 64, 1, 8);
var tube = new THREE.Mesh(
  tubeGeo,
  new THREE.MeshBasicMaterial( { color: 0xff0000 } )
);
scene.add(tube);

// cube geometry
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

update();