// Aperçu des scans : l'orientation EXIF dit de combien tourner l'image pour qu'elle soit à l'endroit.
const ROTATIONS = { 1: 0, 3: 180, 6: 90, 8: 270 };

export function rotationFor(exifOrientation) {
  return ROTATIONS[exifOrientation] ?? 0;
}

export function previewStyle(exifOrientation) {
  const degrees = rotationFor(exifOrientation);
  return degrees === 0 ? "" : `transform: rotate(${degrees}deg);`;
}

// Après une rotation de 90 ou 270 degrés, la largeur et la hauteur s'échangent.
export function previewSize({ width, height }, exifOrientation) {
  return rotationFor(exifOrientation) % 180 === 0 ? { width, height } : { width: height, height: width };
}
