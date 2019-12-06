import * as THREE from './three/three.module.js';
import * as MATHUTIL from "./mathUtil.js";

export function createSpline() {
    var spline = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 100, 0),
        new THREE.Vector3(0, 100, 20),
        new THREE.Vector3(0, 100, 40),
        new THREE.Vector3(0, 100, 60),
        new THREE.Vector3(0, 100, 80),
        new THREE.Vector3(0, 100, 100),
        new THREE.Vector3(0, 100, 120),
        new THREE.Vector3(0, 100, 140)
      ]);
      
    return spline;
}

export function getPositionOnSplineRadius(spline, splineLength, alpha, theta, radius) {
  var position = spline.getPoint(alpha/splineLength);
  var x = MATHUTIL.radiansToDegrees(Math.sin(theta)) * radius + position.x;
  var y = MATHUTIL.radiansToDegrees(Math.cos(theta)) * radius + position.y;

  return new THREE.Vector3(x, y, position.z);
}
