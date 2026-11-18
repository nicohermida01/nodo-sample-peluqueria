import { site } from '../config/site';

const ars = new Intl.NumberFormat(site.lang, {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

/** "$ 38.000" (es-AR, no decimals). */
export function formatPrice(value: number): string {
  return ars.format(value);
}

/** "desde $ 38.000". */
export function formatFromPrice(value: number): string {
  return `${site.copy.services.fromLabel} ${formatPrice(value)}`;
}

interface Duration {
  min: number;
  max?: number;
}

/** Durations up to this many minutes are written in minutes ("75 min"). */
const MINUTES_THRESHOLD = 90;

function hours(total: number, withUnit: boolean): string {
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (m === 0) return withUnit ? `${h} h` : `${h}`;
  return `${h} h ${m}`;
}

/**
 * Consistent duration copy:
 * - short services in minutes: "45 min", "60–75 min"
 * - long services in hours: "2 h", "2 h 30", "3–4 h", "2 h 30 – 3 h 30"
 */
export function formatDuration({ min, max }: Duration): string {
  const top = max ?? min;
  if (top <= MINUTES_THRESHOLD) {
    return max ? `${min}–${max} min` : `${min} min`;
  }
  if (!max) return single(min);
  const wholeHours = min % 60 === 0 && max % 60 === 0;
  if (wholeHours) return `${min / 60}–${max / 60} h`;
  return `${single(min)} – ${single(max)}`;
}

/** One endpoint: minutes below an hour, hours otherwise ("45 min", "1 h 30", "4 h"). */
function single(total: number): string {
  return total < 60 ? `${total} min` : hours(total, true);
}

/** Span across several services, e.g. a category: "45 min – 4 h". */
export function formatDurationSpan(durations: Duration[]): string {
  const min = Math.min(...durations.map((d) => d.min));
  const max = Math.max(...durations.map((d) => d.max ?? d.min));
  return min === max ? formatDuration({ min }) : formatDuration({ min, max });
}

/** ISO 8601 duration for <time datetime>. */
export function isoDuration(minutes: number): string {
  return `PT${minutes}M`;
}

/** Replaces {key} placeholders literally. */
export function fill(template: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce(
    (out, [key, value]) => out.replaceAll(`{${key}}`, () => String(value)),
    template,
  );
}

export interface HeadlinePart {
  text: string;
  emphasis: boolean;
}

/** Splits "Pelo con criterio, turnos *sin apuro*." into plain/emphasis parts. */
export function parseHeadline(headline: string): HeadlinePart[] {
  return headline
    .split(/(\*[^*]+\*)/)
    .filter(Boolean)
    .map((chunk) =>
      chunk.startsWith('*') && chunk.endsWith('*')
        ? { text: chunk.slice(1, -1), emphasis: true }
        : { text: chunk, emphasis: false },
    );
}

/** Headline without emphasis markers (for titles, aria, JSON-LD). */
export function plainHeadline(headline: string): string {
  return headline.replaceAll('*', '');
}

export const firstName = (fullName: string): string => fullName.split(' ')[0] ?? fullName;
