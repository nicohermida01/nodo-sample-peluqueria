import { getCollection, type CollectionEntry } from 'astro:content';
import { SERVICE_CATEGORIES, WORK_CATEGORIES } from '../content.config';
import { site } from '../config/site';

export type Service = CollectionEntry<'services'>;
export type Stylist = CollectionEntry<'team'>;
export type Work = CollectionEntry<'gallery'>;
export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];
export type WorkCategory = (typeof WORK_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  cortes: 'Cortes',
  color: 'Color',
  tratamientos: 'Tratamientos',
  'peinados-y-eventos': 'Peinados y eventos',
  barberia: 'Barbería',
};

/** Shorter labels for the hero chips. */
export const CATEGORY_SHORT_LABELS: Record<ServiceCategory, string> = {
  ...CATEGORY_LABELS,
  'peinados-y-eventos': 'Peinados',
};

export const WORK_CATEGORY_LABELS: Record<WorkCategory, string> = {
  corte: 'Corte',
  color: 'Color',
  peinado: 'Peinado',
  barberia: 'Barbería',
};

/** Service category that best represents each work category (for cover photos). */
const WORK_FOR_SERVICE_CATEGORY: Record<ServiceCategory, WorkCategory> = {
  cortes: 'corte',
  color: 'color',
  tratamientos: 'peinado',
  'peinados-y-eventos': 'peinado',
  barberia: 'barberia',
};

export const serviceCategories = SERVICE_CATEGORIES;

const byOrder = <T extends { data: { order: number } }>(a: T, b: T) => a.data.order - b.data.order;

export async function getServices(): Promise<Service[]> {
  const all = await getCollection('services');
  return all.sort(
    (a, b) =>
      SERVICE_CATEGORIES.indexOf(a.data.category) - SERVICE_CATEGORIES.indexOf(b.data.category) ||
      byOrder(a, b),
  );
}

export async function getTeam(): Promise<Stylist[]> {
  return (await getCollection('team')).sort(byOrder);
}

export async function getWorks(): Promise<Work[]> {
  return (await getCollection('gallery')).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export interface CategoryGroup {
  category: ServiceCategory;
  label: string;
  services: Service[];
}

export function groupByCategory(services: Service[]): CategoryGroup[] {
  return SERVICE_CATEGORIES.map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    services: services.filter((s) => s.data.category === category).sort(byOrder),
  })).filter((g) => g.services.length > 0);
}

/** Featured services of a category; filled with the first ones by order up to `max`. */
export function featuredOf(services: Service[], max = 3): Service[] {
  const featured = services.filter((s) => s.data.featured);
  const rest = services.filter((s) => !s.data.featured);
  return [...featured, ...rest].slice(0, max).sort(byOrder);
}

/** Longest estimated duration of a service. */
export const longestDuration = (s: Service): number => s.data.duration.max ?? s.data.duration.min;

export const needsDeposit = (s: Service): boolean =>
  longestDuration(s) > site.commercial.deposit.minDurationMinutes;

/** Lowest starting price; 0 for an empty list (callers drop empty groups). */
export const lowestPrice = (services: Service[]): number =>
  services.length === 0 ? 0 : Math.min(...services.map((s) => s.data.priceFrom));

/** Cover work for a service category: a featured work linked to one of its services. */
export function coverWorkFor(category: ServiceCategory, services: Service[], works: Work[]): Work | undefined {
  const ids = new Set(services.filter((s) => s.data.category === category).map((s) => s.id));
  const linked = works.filter((w) => w.data.service && ids.has(w.data.service.id));
  return (
    linked.find((w) => w.data.featured && !w.data.before) ??
    linked[0] ??
    works.find((w) => w.data.category === WORK_FOR_SERVICE_CATEGORY[category])
  );
}

export const stylistsOf = (service: Service, team: Stylist[]): Stylist[] =>
  service.data.stylists
    .map((ref) => team.find((t) => t.id === ref.id))
    .filter((t): t is Stylist => Boolean(t));

export const servicesOf = (stylist: Stylist, services: Service[]): Service[] =>
  services.filter((s) => s.data.stylists.some((ref) => ref.id === stylist.id));
