// Un paiement porte une référence stable (contrat + échéance) : une même référence ne débite jamais deux fois.
export function paymentReference(contractId, dueDate) {
  return `PAY-${contractId}-${dueDate}`;
}

// `storage` garde les paiements déjà réussis (un Map, ou un adaptateur sur sessionStorage qui expose has/get/set).
export function createPaymentGuard({ storage = new Map() } = {}) {
  const inFlight = new Map();

  return {
    async submit(reference, charge) {
      if (storage.has(reference)) {
        return { ...storage.get(reference), rejoue: true };
      }
      if (!inFlight.has(reference)) {
        const attempt = charge(reference)
          .then((result) => {
            storage.set(reference, result);
            return result;
          })
          .finally(() => inFlight.delete(reference));
        inFlight.set(reference, attempt);
      }
      return inFlight.get(reference);
    },
  };
}
