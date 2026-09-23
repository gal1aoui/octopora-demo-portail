// Contrôle de la taille d'une pièce jointe avant l'envoi : on prévient l'assuré au lieu d'échouer en silence.
export const UPLOAD_LIMIT_BYTES = 10 * 1024 * 1024;

export function formatSize(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1).replace(".", ",")} Mo`;
  return `${Math.ceil(bytes / 1024)} Ko`;
}

export function checkUploadSize(file) {
  if (file.size <= UPLOAD_LIMIT_BYTES) return { ok: true };
  return {
    ok: false,
    message: `${file.name} pèse ${formatSize(file.size)} : la limite est de ${formatSize(UPLOAD_LIMIT_BYTES)}. Réduisez la photo ou envoyez-la en plusieurs fichiers.`,
  };
}
