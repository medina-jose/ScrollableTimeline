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