// Double authentification : un code à six chiffres, valable 5 minutes, trois essais au plus.
export const CODE_TTL_MS = 5 * 60 * 1000;
export const MAX_ATTEMPTS = 3;

export function isNewDevice(knownDevices, deviceId) {
  return !knownDevices.includes(deviceId);
}

export function issueCode({ randomInt, now }) {
  return {
    code: String(randomInt(0, 1000000)).padStart(6, "0"),
    expiresAt: now() + CODE_TTL_MS,
    attempts: 0,
  };
}

export function verifyCode(record, input, now) {
  if (record.attempts >= MAX_ATTEMPTS) return { ok: false, reason: "trop-d-essais", record };
  if (now() > record.expiresAt) return { ok: false, reason: "expire", record };
  if (record.code !== input) {
    return { ok: false, reason: "incorrect", record: { ...record, attempts: record.attempts + 1 } };
  }
  return { ok: true, reason: null, record };
}
