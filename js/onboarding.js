// Parcours d'accueil : trois écrans, et l'assuré reprend là où il s'était arrêté.
const STEP_KEY = "accueil:etape";

export function nextStep(current, total) {
  return Math.min(current + 1, total - 1);
}

export function previousStep(current) {
  return Math.max(current - 1, 0);
}

export function loadStep(storage, total) {
  const saved = Number.parseInt(storage.getItem(STEP_KEY) ?? "0", 10);
  return Number.isInteger(saved) && saved >= 0 && saved < total ? saved : 0;
}

export function saveStep(storage, step) {
  storage.setItem(STEP_KEY, String(step));
}

if (typeof document !== "undefined") {
  const steps = [...document.querySelectorAll(".onboarding-step")];
  const dots = [...document.querySelectorAll(".onboarding-dots span")];
  let current = loadStep(localStorage, steps.length);

  const show = () => {
    steps.forEach((step, i) => {
      step.hidden = i !== current;
    });
    dots.forEach((dot, i) => dot.classList.toggle("active", i === current));
    saveStep(localStorage, current);
  };

  document.addEventListener("click", (event) => {
    if (event.target.matches("[data-next]")) {
      current = nextStep(current, steps.length);
    } else if (event.target.matches("[data-previous]")) {
      current = previousStep(current);
    } else {
      return;
    }
    show();
  });
  show();
}
