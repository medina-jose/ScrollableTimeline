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
    target.x = mouseX * .01;
    target.y = -mouseY * .01;
    target.z = -10;
    camera.lookAt(target);
}

function initScene () {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    var gridHelper = new THREE.GridHelper( 1000, 50 );
    scene.add( gridHelper );
}

function initObjects () {
    var theta = 0;
    var x, y;

    for(i=0; i<10000; i+=50)
    {
        let position = spline.getPoint(i / 10000);
        x = radiansToDegrees(Math.sin(theta)) * radius;
        y = radiansToDegrees(Math.cos(theta)) * radius;
        x += position.x;
        y += position.y;

        // create a block object around spline
        let geometry = new THREE.BoxGeometry( 1, 1, 1 );
        let material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
        let cube = new THREE.Mesh( geometry, material );
        cube.position.set(x, y, position.z);
        scene.add( cube );

        theta += 30;
    }
}

function radiansToDegrees(radians) { return radians * Math.PI / 180; }

function addEventListeners() {
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('wheel', onDocumentMouseScroll, false);
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
}

function onDocumentMouseScroll(event) {
    camPosIndex += event.deltaY / 100;
    console.log("Delta: " + event.deltaY + " Cam Index: " + camPosIndex);
    if(camPosIndex > 10000) { camPosIndex = 0;}
    else if(camPosIndex < 0) { camPosIndex = 1;}
}

var scene, camera, renderer;
var spline;
var camPosIndex = 0;
var radius = 350;

var mouseX = 0, mouseY = 0;
var targetX = 0, targetY = 0, targetZ = 0;
var target = new THREE.Vector3();
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

initScene();
addEventListeners();
spline = createSpline();
initObjects();

var position = spline.getPoint(0);
var rotation = spline.getTangent(0);
camera.position.x = position.x;
camera.position.y = position.y;
camera.position.z = position.z + 10;
camera.rotation.x = rotation.x;
camera.rotation.y = rotation.y;
camera.rotation.z = rotation.z;
camera.lookAt(spline.getPoint(1/spline.points.length))

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