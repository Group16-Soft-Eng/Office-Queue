export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('it-IT', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}