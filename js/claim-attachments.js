// Pièces jointes d'une déclaration : dix fichiers au plus, photos ou PDF.
export const MAX_FILES = 10;
export const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/heic", "application/pdf"];

export function checkAttachments(files) {
  const errors = [];
  if (files.length > MAX_FILES) {
    errors.push(`Vous pouvez joindre ${MAX_FILES} fichiers au plus (${files.length} sélectionnés).`);
  }
  for (const file of files) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      errors.push(`${file.name} : seuls les photos (JPEG, PNG, HEIC) et les PDF sont acceptés.`);
    }
  }
  return { ok: errors.length === 0, errors };
}
