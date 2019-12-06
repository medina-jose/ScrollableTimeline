import * as THREE from './three/three.module.js';
import * as MATHUTIL from "./mathUtil.js";

export function createSpline() {
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

export function getPositionOnSplineRadius(spline, splineLength, alpha, theta, radius) {
  var position = spline.getPoint(alpha/splineLength);
  var x = MATHUTIL.radiansToDegrees(Math.sin(theta)) * radius + position.x;
  var y = MATHUTIL.radiansToDegrees(Math.cos(theta)) * radius + position.y;

  return new THREE.Vector3(x, y, position.z);
}
