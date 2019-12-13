import * as THREE from './three/three.module.js';
import { FBXLoader } from "./three/FBXLoader.js";
import * as SPLINE from "./spline.js";
import * as MATHUTIL from "./mathUtil.js";
import {Release} from "./release.js";
import * as API from "./ui/api.js";

function initScene () {
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x988989 );
    camera = new THREE.PerspectiveCamera(80, window.innerWidth/window.innerHeight, .1, 200);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    light.position.set( 0, 200, 0 );
    scene.add( light );
    

    // var gridHelper = new THREE.GridHelper( 1000, 50 );
    // scene.add( gridHelper );
}

// function generateTimeline(artistName) {
//     var artistId = getArtistId(); // search for artist
//     var masterReleaseIds = getArtistReleaseIds(artistId); // request releases by artist

//     // for each release
//     // generate object to be seen on timeline
//     var releaseJSON;
//     var release;
//     masterReleaseIds.forEach((masterReleaseId) => {
//         releaseJSON = getRelease(masterReleaseId);
//         release = addRelease(releaseJSON);
//         if(release != null) { releases.push(release);}      
//     });

//     // calculate length of each decade on timeline based on the number of release in decade
//     // what is an efficient way to get year
//     var decade;
//     releases.forEach((release) => {
//         decade = release.getDecade();
//         switch(decade) {
//             case Decade.NineteenHundreds: {
//                 break;
//             }
//         }
//     });
// }

async function generateTimeline() {
    var artistIdPromise = API.getArtistId(testArtist)
    artistIdPromise.then(function(artistId){
        var releaseIdsPromise = API.getArtistReleaseIds(artistId);
        releaseIdsPromise.then(function(releaseIds) {
            getReleases(releaseIds);
        })
        .catch(function(err) {
            console.log(err);
        });
    })
    .catch(function(err){
        console.log(err);
    });
}

function getReleases(releaseIds) {
    var allReleases  = [];
    releaseIds.reduce( (accumulator, currentValue, index) => 
        accumulator.then(releases => 
            API.getRelease(currentValue).then(release => allReleases.push(release))
        ),
        Promise.resolve([])).then(results => {
            console.log(allReleases);
            var release;
            allReleases.forEach((releaseJSON) => {
                addRelease(releaseJSON);
            });
        });
}


function addRelease (json) {
    if(json == null) { return null; }
    var release = new Release(json);

    // extend length of spline by a fixed amount
    var position;
    if(splinePoints.length <= 0) { position = splinePoints.push(new THREE.Vector3(0, 100, 0)); }
    else {
        // get z position of last point in spline
        // make new spline point an extension of that
        var lastPoint = splinePoints[splinePoints.length - 1];
        position = splinePoints.push(new THREE.Vector3(0, 100, lastPoint.z + 100));
    }

    var plane = generateReleasePlane(release.getImagePath(), position);
    if(plane == null) { return null; }

    release.object = plane;
    scene.add(plane);
    return release;
}

function generateReleasePlane(texturePath, position) {
    if(position == null) { return null; }

    var texture, material, plane;
    texture = THREE.ImageUtils.loadTexture(texturePath);
    if(texture == null ) { texture =  THREE.ImageUtils.loadTexture("../images/cover.jpg"); }
    material = new THREE.MeshLambertMaterial({ map: texture });
    plane = new THREE.Mesh(new THREE.PlaneGeometry(defaultPlaneSize.x, defaultPlaneSize.y), material);

    plane.position.set(position.x, position.y, position.z);
    plane.rotation.y = getRandom(0, 2*Math.PI);
    plane.callback = function () {
        mode = ViewMode.SingleRelease;
        transitioning = true;
        singleRelease = this;
        this.rotation.set(0, Math.PI, 0);
    }

    return plane;
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
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
        plane.callback = function () { 
            mode = ViewMode.SingleRelease;
            transitioning = true;
            singleRelease = this;
            this.rotation.set(0,Math.PI,0);
        }

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

        //     releaseObjects.push(object);
        //     scene.add(object);
        // });

        releaseObjects.push(plane);
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
    mouseY = (event.clientY - windowHalfY) * 4;
}

function onDocumentMouseDown(event) {
    mouseX = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouseY = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);
    var intersects = raycaster.intersectObjects(releaseObjects);

    if(intersects.length > 0 && mode == ViewMode.Timeline) {
        intersects[0].object.callback();
    }
    else if(!transitioning && mode == ViewMode.SingleRelease) {
        mode = ViewMode.Timeline;
    }
}

function onDocumentMouseScroll(event) {
    if(mode != ViewMode.Timeline) { return; }

    camPosIndex += event.deltaY / 10;
    console.log("Delta: " + event.deltaY + " Cam Index: " + camPosIndex);
    if(camPosIndex > 10000) { camPosIndex = 0;}
    else if(camPosIndex < 0) { camPosIndex = 1;}
}


function update () {
    renderer.render(scene, camera);
    requestAnimationFrame( update );

    if(mode == ViewMode.Timeline) {
        let position = spline.getPoint(camPosIndex / 10000);
  
        // move camera along spline
        camera.position.x = position.x;
        camera.position.y = position.y;
        camera.position.z = position.z + 10;

        // rotate record objects
        releaseObjects.forEach((recordObject) => {
            recordObject.rotation.y += MATHUTIL.degreesToRadians(.0001);
        });
    }
    else if (transitioning == true && singleRelease != null) {
        camera.position.sub(singleRelease.position).setLength(30).add(singleRelease.position);
        transitioning = false;
    }
   
    // look at mouse position with easing
    target.x = -mouseX * .03;
    target.y = -mouseY * .03;
    target.z = camera.position.z + 180;
    camera.lookAt(target);


}

const RADIUS = 2000;
const ViewMode = {
    Timeline: "Timeline",
    SingleRelease: "SingleRelease"
}

var scene, camera, renderer;
var spline;
var camPosIndex = 0;

var mouseX = 0, mouseY = 0;
var target = new THREE.Vector3();
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var fbxLoader = new FBXLoader();
var fbxModelPath = "../models/fbx/";

var releaseObjects = [];
var singleRelease;
var raycaster = new THREE.Raycaster();

var mode = ViewMode.Timeline;
var transitioning = false;

var omega = 0;
var splinePoints = [];
var defaultPlaneSize = new THREE.Vector2(20, 20);
var testArtist = "The+Strokes";
var releases = [];

const Decade = Release.Decade;
var releaseDict = [

]

generateTimeline();
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