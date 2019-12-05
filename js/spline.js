function createSpline() {
    var spline = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 20),
        new THREE.Vector3(0, 0, 40),
        new THREE.Vector3(0, 0, 60),
        new THREE.Vector3(0, 0, 80),
        new THREE.Vector3(0, 0, 100),
        new THREE.Vector3(0, 0, 120),
        new THREE.Vector3(0, 0, 140)
      ]);
      
    return spline;
}


// // scene
// var scene = new THREE.Scene();

// // renderer
// var renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// // spline
// var spline = createSpline();

// // camera (place cam at beginning of spline)
// var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
// var position = spline.getPoint(0);
// var rotation = spline.getTangent(0);
// camera.position.x = position.x;
// camera.position.y = position.y;
// camera.position.z = position.z;

// // controls
// var controls = new THREE.OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.dampingFactor = 0.25;
// controls.enableZoom = true;

// // lighting
// var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
// keyLight.position.set(-100, 0, 100);

// var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
// fillLight.position.set(100, 0, 100);

// var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
// backLight.position.set(100, 0, -100).normalize();

// var ambientLight = new THREE.AmbientLight( 0xcccccc, 5 );
// var pointLight = new THREE.PointLight( 0xffffff, 1 );
// var light = new THREE.DirectionalLight( 0xffffff );
// light.position.set( 0, 1, 1 ).normalize();
// scene.add(light);
// camera.add( pointLight );
// scene.add( camera );
// scene.add( ambientLight );
// scene.add(keyLight);
// scene.add(fillLight);
// scene.add(backLight);

// // grid
// var size = 1000;
// var divisions = 50;
// var gridHelper = new THREE.GridHelper( size, divisions );
// scene.add( gridHelper );

// // tube geometry from spline
// var tubeGeo = new THREE.TubeGeometry(spline, 64, 1, 8);
// var tube = new THREE.Mesh(
//   tubeGeo,
//   new THREE.MeshBasicMaterial( { color: 0xff0000 } )
// );
// scene.add(tube);

// // cube geometry
// var geometry = new THREE.BoxGeometry( 1, 1, 1 );
// var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
// var cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// animate();

// function animate () {
// 	requestAnimationFrame( animate );
// 	controls.update();
// 	renderer.render(scene, camera);
// };