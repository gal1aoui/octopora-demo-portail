// Déclaration de sinistre en trois étapes : les faits, les photos, la confirmation.
export const STEPS = ["faits", "photos", "confirmation"];

export function canContinue(step, values) {
  if (step === "faits") {
    return Boolean(values.date && values.type && (values.description ?? "").trim().length >= 20);
  }
  if (step === "photos") {
    // Les photos sont facultatives : un sinistre sans photo reste déclarable.
    return true;
  }
  return values.certifie === "on";
}

// La saisie reste sur l'appareil : une coupure de réseau ne fait rien perdre.
const DRAFT_KEY = "declaration-sinistre:brouillon";

export function saveDraft(storage, values) {
  storage.setItem(DRAFT_KEY, JSON.stringify(values));
}

export function restoreDraft(storage) {
  try {
    return JSON.parse(storage.getItem(DRAFT_KEY)) ?? {};
  } catch {
    return {};
  }
}

export function clearDraft(storage) {
  storage.removeItem(DRAFT_KEY);
}

function fillForm(form, values) {
  for (const [name, value] of Object.entries(values)) {
    const field = form.elements.namedItem(name);
    if (field && field.type !== "file" && field.type !== "checkbox") {
      field.value = value;
    }
  }
}

function showStep(form, index) {
  form.querySelectorAll("fieldset").forEach((fieldset, i) => {
    fieldset.hidden = i !== index;
  });
  form.querySelector(".progress").textContent = `Étape ${index + 1} sur ${STEPS.length}`;
}

if (typeof document !== "undefined") {
  const form = document.getElementById("declaration");
  let current = 0;
  fillForm(form, restoreDraft(localStorage));
  showStep(form, current);

  form.addEventListener("input", () => {
    const { photos, ...values } = Object.fromEntries(new FormData(form));
    saveDraft(localStorage, values);
  });
  form.addEventListener("submit", () => clearDraft(localStorage));

  form.addEventListener("click", (event) => {
    if (!event.target.matches("[data-next]")) {
      return;
    }
    const values = Object.fromEntries(new FormData(form));
    if (canContinue(STEPS[current], values)) {
      current += 1;
      showStep(form, current);
    }
  });
}
