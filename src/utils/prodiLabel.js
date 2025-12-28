export const PRODI_LABEL = {
  IF: "Informatika",
  SI: "Sistem Informasi",
};

export function formatProdi(value) {
  return PRODI_LABEL[value] || value || "-";
}
