// Client du nouveau prestataire de paiement. Le réseau est injecté : les tests n'appellent aucun service.
const STATUS_MAP = {
  succeeded: "paye",
  failed: "refuse",
  canceled: "annule",
  requires_action: "authentification",
};

export function mapProviderStatus(status) {
  return STATUS_MAP[status] ?? "inconnu";
}

export function createProviderClient({ baseUrl, apiKey, fetchImpl = fetch }) {
  return {
    async charge({ reference, amount }) {
      const response = await fetchImpl(`${baseUrl}/charges`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          // La même référence renvoie la même opération : un nouvel essai ne débite pas deux fois.
          "Idempotency-Key": reference,
        },
        body: JSON.stringify({ reference, amount: Math.round(amount * 1000), currency: "TND" }),
      });
      if (!response.ok) {
        throw new Error(`Prestataire indisponible (${response.status})`);
      }
      const data = await response.json();
      return { reference, statut: mapProviderStatus(data.status), idPrestataire: data.id };
    },
  };
}
