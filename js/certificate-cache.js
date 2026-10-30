// Cache des attestations : 24 heures, et une nouvelle clé dès qu'un avenant change la version du contrat.
export const TTL_MS = 24 * 60 * 60 * 1000;

export function cacheKey(contract) {
  return `${contract.id}:v${contract.version}`;
}

export function createCertificateCache({ now = () => Date.now() } = {}) {
  const entries = new Map();

  return {
    get(contract) {
      const entry = entries.get(cacheKey(contract));
      if (!entry || now() - entry.storedAt > TTL_MS) {
        return null;
      }
      return entry.pdf;
    },
    set(contract, pdf) {
      entries.set(cacheKey(contract), { pdf, storedAt: now() });
    },
    invalidate(contractId) {
      for (const key of entries.keys()) {
        if (key.startsWith(`${contractId}:`)) {
          entries.delete(key);
        }
      }
    },
  };
}
