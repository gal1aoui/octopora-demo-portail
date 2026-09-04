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

function showStep(form, index) {
  form.querySelectorAll("fieldset").forEach((fieldset, i) => {
    fieldset.hidden = i !== index;
  });
  form.querySelector(".progress").textContent = `Étape ${index + 1} sur ${STEPS.length}`;
}

if (typeof document !== "undefined") {
  const form = document.getElementById("declaration");
  let current = 0;
  showStep(form, current);

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
