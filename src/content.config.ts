import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const SERVICE_CATEGORIES = [
  'cortes',
  'color',
  'tratamientos',
  'peinados-y-eventos',
  'barberia',
] as const;

export const WORK_CATEGORIES = ['corte', 'color', 'peinado', 'barberia'] as const;

export const ORIENTATIONS = ['portrait', 'landscape', 'square'] as const;

/**
 * Entry ids come from the file name, so `reference('team')` values are file names
 * (e.g. "martina-sosa"). Keep the `slug` field equal to the file name.
 */
const fileId = ({ entry }: { entry: string }) => entry.replace(/\.json$/, '');

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use kebab-case');
const ars = z.number().int().positive();
const minutes = z.number().int().positive().multipleOf(5);

/** Attribution for stock photos (Unsplash/Pexels). Mirror it in CREDITS.md. */
const credit = z.object({ author: z.string().min(1), url: z.url() }).optional();

const services = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/services', generateId: fileId }),
  schema: z
    .object({
      name: z.string().min(1),
      slug,
      category: z.enum(SERVICE_CATEGORIES),
      description: z.string().min(1).max(220),
      /** Estimated duration in minutes. `max` when it depends on length/density. */
      duration: z.object({ min: minutes, max: minutes.optional() }),
      /** Starting price in ARS. Always rendered with the "desde" label. */
      priceFrom: ars,
      /** Color correction, bridal, etc.: no direct booking without a prior consultation. */
      requiresConsultation: z.boolean().default(false),
      /** Stylists who perform this service (the only place this relation is stored). */
      stylists: z.array(reference('team')).min(1),
      /** Shown in the home "servicios destacados" block. */
      featured: z.boolean().default(false),
      /** Order inside its category (ascending). */
      order: z.number().int().default(0),
    })
    .refine((s) => s.duration.max === undefined || s.duration.max > s.duration.min, {
      message: 'duration.max must be greater than duration.min',
      path: ['duration', 'max'],
    }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/team', generateId: fileId }),
  schema: ({ image }) =>
    z.object({
      name: z.string().min(1),
      slug,
      role: z.string().min(1),
      specialties: z.array(z.string().min(1)).min(1),
      yearsOfExperience: z.number().int().nonnegative(),
      quote: z.string().min(1).max(140),
      bio: z.string().min(1),
      instagram: z.object({ handle: z.string().startsWith('@'), url: z.url() }),
      /** 1:1. Main portrait. */
      photo: image(),
      photoAlt: z.string().min(1),
      /** 1:1. Second photo for the hover crossfade (working, candid). */
      photo2: image(),
      photo2Alt: z.string().min(1),
      /**
       * Services this person is known for (highlighted on the profile).
       * Who performs each service is stored in `services.stylists`.
       */
      signatureServices: z.array(reference('services')).min(1).max(4),
      credit,
      order: z.number().int().default(0),
    }),
});

const gallery = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/gallery', generateId: fileId }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      category: z.enum(WORK_CATEGORIES),
      stylist: reference('team'),
      service: reference('services').optional(),
      /** The finished work ("después" when there is a before/after pair). */
      image: image(),
      alt: z.string().min(10),
      orientation: z.enum(ORIENTATIONS),
      /** Optional before/after pair. Never retouched in a misleading way. */
      before: z.object({ image: image(), alt: z.string().min(10) }).optional(),
      /** Shown in the home gallery selection. */
      featured: z.boolean().default(false),
      credit,
      date: z.coerce.date(),
    }),
});

export const collections = { services, team, gallery };
