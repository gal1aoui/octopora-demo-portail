// Corrections de l'audit de sécurité : pas de HTML injecté, pas de donnée personnelle dans les journaux.
const ENTITIES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ENTITIES[char]);
}

export function maskPhone(phone) {
  const digits = phone.replace(/\D/g, "");
  return `${"*".repeat(Math.max(digits.length - 3, 0))}${digits.slice(-3)}`;
}

const SECRET_KEYS = ["password", "motDePasse", "token", "code"];

export function redactForLog(entry) {
  return Object.fromEntries(
    Object.entries(entry).map(([key, value]) => {
      if (SECRET_KEYS.includes(key)) return [key, "[masqué]"];
      if (key === "telephone") return [key, maskPhone(String(value))];
      if (key === "email") return [key, String(value).replace(/^(.).*(@.*)$/, "$1***$2")];
      return [key, value];
    })
  );
}
