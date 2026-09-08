// Réduction des photos prises au téléphone avant l'envoi d'une déclaration.
export const MAX_SIDE = 1600;
export const SKIP_BELOW_BYTES = 500 * 1024;

export function planCompression({ width, height, bytes }) {
  if (bytes <= SKIP_BELOW_BYTES) {
    return { compress: false, width, height, quality: 1 };
  }
  const ratio = Math.min(1, MAX_SIDE / Math.max(width, height));
  return {
    compress: true,
    width: Math.round(width * ratio),
    height: Math.round(height * ratio),
    quality: bytes > 4 * 1024 * 1024 ? 0.7 : 0.82,
  };
}
