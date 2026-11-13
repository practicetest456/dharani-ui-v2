import type { Item, Option } from '@/types';

export const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
export const none = (v: string) => !v || /^-+$/.test(v);

// "Mittapalle | మిట్టపల్లి" -> English + Telugu.
export const bi = (v: string) => {
  const [en, te] = v.split('|').map((s) => s.trim());
  return { en: en || '-', te: te || '' };
};

// "X / X" with identical halves is shown once.
export const dedupe = (v: string) => {
  const p = v.split(' / ').map((x) => x.trim());
  return p.length === 2 && p[0] === p[1] ? p[0] : v;
};

export const inr = (v: string, empty = '-') => {
  const n = Number(v);
  return v && !isNaN(n) ? '₹ ' + n.toLocaleString('en-IN', { maximumFractionDigits: 2 }) : v || empty;
};

export const itemOptions = (items: Item[]): Option[] =>
  items.map((i) => ({ value: String(i.id), label: i.telugu ? `${i.name} | ${i.telugu}` : i.name }));

// Finds a value by the start of its portal label; remembers what was used so leftovers can still be listed.
export function readFields(m: Record<string, string>) {
  const used = new Set<string>();
  const get = (label: string) => {
    const key = Object.keys(m).find((k) => norm(k).startsWith(norm(label)));
    if (key) used.add(key);
    return key ? m[key].trim() : '';
  };
  return { get, rest: () => Object.entries(m).filter(([k]) => !used.has(k)) };
}
