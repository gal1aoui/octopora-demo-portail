// Le tableau de bord charge tous ses blocs en parallèle. Un bloc en erreur n'empêche pas les autres de s'afficher.
export async function loadDashboard(loaders) {
  const names = Object.keys(loaders);
  const settled = await Promise.allSettled(names.map((name) => loaders[name]()));
  return Object.fromEntries(
    names.map((name, index) => {
      const result = settled[index];
      return [name, result.status === "fulfilled" ? { ok: true, value: result.value } : { ok: false, error: result.reason.message }];
    })
  );
}
