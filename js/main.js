function update () {
    renderer.render(scene, camera);
    requestAnimationFrame( update );
	// controls.update();

    camPosIndex++;
    if (camPosIndex > 1000) { camPosIndex = 0 };

    let position = spline.getPoint(camPosIndex / 1000);
    let rotation = spline.getTangent(camPosIndex / 1000);
  
    // move camera along spline
    camera.position.x = position.x;
    camera.position.y = position.y;
    camera.position.z = position.z + 100;
    
    // look at mouse position with easing
    target.x = mouseX * .01;
    target.y = -mouseY * .01;
    target.z = 0;
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

function addEventListeners() {
    document.addEventListener('mousemove', onDocumentMouseMove, false);
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
}

var scene, camera, renderer;
var spline;
var camPosIndex = 0;

var mouseX = 0, mouseY = 0;
var targetX = 0, targetY = 0, targetZ = 0;
var target = new THREE.Vector3();
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

initScene();
addEventListeners();
spline = createSpline();
var position = spline.getPoint(0);
var rotation = spline.getTangent(0);
camera.position.x = position.x;
camera.position.y = position.y;
camera.position.z = position.z + 100;
camera.rotation.x = rotation.x;
camera.rotation.y = rotation.y;
camera.rotation.z = rotation.z;
camera.lookAt(new THREE.Vector3(0,0,0))

// controls
// var controls = new THREE.OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.dampingFactor = 0.25;
// controls.enableZoom = true;

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