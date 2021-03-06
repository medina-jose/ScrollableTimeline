export function radiansToDegrees(radians) { return radians * Math.PI / 180; }
export function degreesToRadians(degrees) { return degrees * 180 / Math.PI; }
export function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}
export function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
  }
