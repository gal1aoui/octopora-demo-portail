// E-mail envoyé à l'assuré à chaque changement de statut de son dossier.
const STATUS_TEXT = {
  recu: "Nous avons bien reçu votre déclaration.",
  complet: "Votre dossier est complet et passe à l'examen.",
  expertise: "Un expert va examiner les dommages.",
  decision: "Une décision a été prise sur votre dossier.",
  indemnise: "Votre indemnisation a été versée.",
};

export function statusEmail(claimNumber, status, firstName) {
  const text = STATUS_TEXT[status];
  if (!text) throw new Error(`Statut inconnu : ${status}`);
  return {
    subject: `Dossier ${claimNumber} : ${text}`,
    body: `Bonjour ${firstName},\n\n${text}\nVous pouvez suivre votre dossier dans votre espace assuré.`,
  };
}

export function shouldNotify(previousStatus, newStatus) {
  return previousStatus !== newStatus && newStatus in STATUS_TEXT;
}
