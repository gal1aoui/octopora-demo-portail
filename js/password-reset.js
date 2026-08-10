// Jeton de réinitialisation du mot de passe : valable une heure, à usage unique.
export const RESET_TTL_MS = 60 * 60 * 1000;

export function createResetToken(insuredId, { now = () => Date.now(), random = () => crypto.randomUUID() } = {}) {
  const issuedAt = now();
  return { token: random(), insuredId, issuedAt, expiresAt: issuedAt + RESET_TTL_MS, used: false };
}

export function checkResetToken(record, token, now = Date.now()) {
  if (!record || record.token !== token) return { ok: false, reason: "inconnu" };
  if (record.used) return { ok: false, reason: "deja-utilise" };
  if (now > record.expiresAt) return { ok: false, reason: "expire" };
  return { ok: true };
}
