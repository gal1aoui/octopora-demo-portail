// Signature d'un avenant : une empreinte SHA-256 de l'avenant et de l'instant de signature, et un journal sans donnée en clair.
export async function sha256Hex(text) {
  const bytes = new TextEncoder().encode(text);
  const digest = await globalThis.crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function maskEmail(email) {
  const [local, domain] = email.split("@");
  return `${local[0]}***@${domain}`;
}

export async function buildSignatureRecord({ avenant, email }, now = () => Date.now()) {
  const signedAt = new Date(now()).toISOString();
  return {
    avenantId: avenant.id,
    signataire: maskEmail(email),
    empreinte: await sha256Hex(`${avenant.id}|${avenant.objet}|${signedAt}`),
    signeLe: signedAt,
  };
}
