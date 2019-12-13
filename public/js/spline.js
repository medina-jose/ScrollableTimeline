import * as THREE from './three/three.module.js';
import * as MATHUTIL from "./mathUtil.js";

export function createSpline() {
    var spline = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 100, 0),
        new THREE.Vector3(0, 100, 100),
        new THREE.Vector3(0, 100, 200),
        new THREE.Vector3(0, 100, 300),
        new THREE.Vector3(0, 100, 400),
        new THREE.Vector3(0, 100, 500),
        new THREE.Vector3(0, 100, 600),
        new THREE.Vector3(0, 100, 700)
      ]);
      
    return spline;
}

export function generateSpline(splinePoints) {
  var spline = new THREE.CatmullRomCurve3(splinePoints);
  return spline;
}

// export function createSpline(points) {
//   var spline = new THREE.CatmullRomCurve3(points);
//   return spline;
// }

export function getPositionOnSplineRadius(spline, splineLength, alpha, theta, radius) {
  var position = spline.getPoint(alpha);
  var x = MATHUTIL.radiansToDegrees(Math.sin(theta)) * radius + position.x;
  var y = MATHUTIL.radiansToDegrees(Math.cos(theta)) * radius + position.y;

  return new THREE.Vector3(x, y, position.z);
}
