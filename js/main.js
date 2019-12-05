function update () {
    renderer.render(scene, camera);
    requestAnimationFrame( update );
	// controls.update();

    camPosIndex++;
    if (camPosIndex > 10000) { camPosIndex = 0 };

    let position = spline.getPoint(camPosIndex / 10000);
    let rotation = spline.getTangent(camPosIndex / 10000);
  
    camera.position.x = position.x;
    camera.position.y = position.y;
    camera.position.z = position.z + 10;
    
    camera.rotation.x = rotation.x;
    camera.rotation.y = rotation.y;
    camera.rotation.z = rotation.z;
    
    camera.lookAt(spline.getPoint((camPosIndex+1) / 10000));
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

var scene;
var camera;
var renderer;
var spline;
var camPosIndex = 0;

initScene();

// create and place camera on spline
spline = createSpline();
var position = spline.getPoint(0);
var rotation = spline.getTangent(0);
camera.position.x = position.x;
camera.position.y = position.y;
camera.position.z = position.z + 10;
camera.rotation.x = rotation.x;
camera.rotation.y = rotation.y;
camera.rotation.z = rotation.z;
camera.lookAt(spline.getPoint(1/spline.points.length))

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