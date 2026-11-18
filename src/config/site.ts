/**
 * Single source of truth for brand data and global copy.
 * To rebrand the template, edit this file and the collections in src/content/.
 * Services, team and gallery copy never live here: they belong to their collections.
 */
import type { ImageMetadata } from 'astro';

import salonChairs from '../assets/salon/salon-sillones.jpg';
import salonWash from '../assets/salon/salon-lavacabezas.jpg';
import salonShelf from '../assets/salon/salon-productos.jpg';
import salonFront from '../assets/salon/salon-fachada.jpg';
import heroDesktop from '../assets/hero/hero-desktop.jpg';
import heroMobile from '../assets/hero/hero-mobile.jpg';

/* ---------- Types ---------- */

export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface NavItem {
  label: string;
  href: string;
}

export interface OpeningHours {
  /** schema.org day names, used for JSON-LD openingHoursSpecification. */
  days: DayOfWeek[];
  /** Human-readable label shown on the site. */
  label: string;
  /** 24h "HH:MM". Omit both for closed days. */
  opens?: string;
  closes?: string;
}

export interface Photo {
  src: ImageMetadata;
  alt: string;
  /** Required when the photo comes from a stock bank (see CREDITS.md). */
  credit?: { author: string; url: string };
}

export interface Promo {
  id: string;
  title: string;
  description: string;
  /** Every promo shows its conditions: no hidden fine print. */
  conditions: string[];
  /** Show it in the announcement bar. Only one promo should have this. */
  announce?: boolean;
  active: boolean;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  service?: string;
  /** true = sample copy. Placeholders must be labeled as such on the page. */
  placeholder: boolean;
}

export interface ProductLine {
  name: string;
  description: string;
  usedInSalon: boolean;
  forSale: boolean;
}

export interface SiteConfig {
  url: string;
  lang: string;
  locale: string;
  brand: {
    name: string;
    shortName: string;
    tagline: string;
    description: string;
  };
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    description: string;
    keywords: string[];
    /** schema.org priceRange. */
    priceRange: string;
  };
  nav: NavItem[];
  legalNav: NavItem[];
  contact: {
    email: string;
    /** Display format. */
    phone: string;
    /** Digits only with country code, no "+" (wa.me format). */
    whatsapp: string;
  };
  address: {
    street: string;
    neighborhood: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    /** Approximate coordinates for JSON-LD and the map facade. */
    geo: { lat: number; lng: number };
    mapsUrl: string;
    /** Loaded only after the user clicks the map facade. */
    mapEmbedUrl: string;
  };
  hours: OpeningHours[];
  social: {
    instagram: { handle: string; url: string };
    others: { label: string; url: string }[];
  };
  booking: {
    /** External booking system (Fresha, Booksy, AgendaPro...). Empty = WhatsApp fallback. */
    externalUrl: string;
    provider: string;
    ctaLabel: string;
    secondaryCtaLabel: string;
    whatsapp: {
      generic: string;
      /** {service} is replaced by the service name. */
      service: string;
      /** {service} and {stylist} are replaced. */
      serviceWithStylist: string;
      /** {stylist} is replaced. */
      stylist: string;
      giftCard: string;
    };
  };
  copy: {
    hero: { eyebrow: string; title: string; lead: string; media: { desktop: Photo; mobile: Photo } };
    marquee: string[];
    services: { eyebrow: string; title: string; lead: string; fromLabel: string; consultationLabel: string };
    gallery: { eyebrow: string; title: string; lead: string; beforeLabel: string; afterLabel: string };
    team: { eyebrow: string; title: string; lead: string };
    salon: { eyebrow: string; title: string; philosophy: string[]; photos: Photo[] };
    products: { title: string; lead: string; lines: ProductLine[] };
    testimonials: { eyebrow: string; title: string; placeholderNotice: string };
    finalCta: { title: string; lead: string };
  };
  commercial: {
    promos: Promo[];
    giftCards: {
      title: string;
      description: string;
      /** The demo only informs; purchase goes through WhatsApp. */
      notice: string;
      amounts: number[];
    };
    deposit: {
      /** Services longer than this need a deposit (seña). */
      minDurationMinutes: number;
      percent: number;
      description: string;
    };
    cancellation: {
      noticeHours: number;
      summary: string;
      rules: string[];
    };
    paymentDiscount: {
      percent: number;
      methods: string[];
      description: string;
    };
    paymentMethods: string[];
  };
  faq: Faq[];
  testimonials: Testimonial[];
  demoNotice: {
    /** Turn off when the template goes live for a real client. */
    enabled: boolean;
    text: string;
  };
}

/* ---------- Data (all fictitious) ---------- */

export const site: SiteConfig = {
  url: 'https://nudo-estudio-de-pelo.example.com',
  lang: 'es-AR',
  locale: 'es_AR',

  brand: {
    name: 'NUDO Estudio de Pelo',
    shortName: 'NUDO',
    tagline: 'Cortes y color pensados para vos, sin apuro.',
    description:
      'Peluquería de autor en Palermo. Cortes, color, balayage, tratamientos, peinados y barbería, con turnos largos y diagnóstico antes de cada servicio.',
  },

  seo: {
    defaultTitle: 'NUDO Estudio de Pelo · Peluquería en Palermo',
    titleTemplate: '%s · NUDO, peluquería en Palermo',
    description:
      'Peluquería de autor en Palermo, CABA. Cortes, balayage en Palermo, color, keratina y barbería sin apuro. Reservá tu turno online o por WhatsApp.',
    keywords: [
      'peluquería en Palermo',
      'balayage en Palermo',
      'colorista en Palermo',
      'corte de pelo Palermo',
      'barbería Palermo',
      'keratina Palermo',
    ],
    priceRange: '$$',
  },

  nav: [
    { label: 'Servicios', href: '/servicios' },
    { label: 'Trabajos', href: '/galeria' },
    { label: 'Equipo', href: '/equipo' },
    { label: 'El salón', href: '/#salon' },
    { label: 'Contacto', href: '/#contacto' },
  ],

  legalNav: [
    { label: 'Política de privacidad', href: '/privacidad' },
    { label: 'Turnos y cancelaciones', href: '/politica-de-turnos' },
  ],

  contact: {
    email: 'hola@nudo-ejemplo.com',
    phone: '+54 9 11 0000-0000',
    whatsapp: '5491100000000',
  },

  address: {
    street: 'Gorriti 1234',
    neighborhood: 'Palermo',
    city: 'Ciudad Autónoma de Buenos Aires',
    region: 'CABA',
    postalCode: 'C1414',
    country: 'AR',
    geo: { lat: -34.5925, lng: -58.4305 },
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Gorriti+1234+Palermo+CABA',
    mapEmbedUrl: 'https://www.google.com/maps?q=Gorriti+1234,+Palermo,+CABA&output=embed',
  },

  hours: [
    {
      days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      label: 'Martes a sábado',
      opens: '10:00',
      closes: '20:00',
    },
    { days: ['Sunday', 'Monday'], label: 'Domingo y lunes' },
  ],

  social: {
    instagram: { handle: '@nudo.ejemplo', url: 'https://www.instagram.com/nudo.ejemplo' },
    others: [],
  },

  booking: {
    externalUrl: '',
    provider: '',
    ctaLabel: 'Reservar turno',
    secondaryCtaLabel: 'Escribinos por WhatsApp',
    whatsapp: {
      generic: 'Hola! Quiero sacar un turno.',
      service: 'Hola! Quiero turno para {service}.',
      serviceWithStylist: 'Hola! Quiero turno para {service} con {stylist}.',
      stylist: 'Hola! Quiero sacar un turno con {stylist}.',
      giftCard: 'Hola! Quiero info sobre las gift cards.',
    },
  },

  copy: {
    hero: {
      eyebrow: 'Peluquería de autor en Palermo',
      title: 'Pelo con criterio, turnos sin apuro.',
      lead: 'Cortes y color pensados para vos, sin apuro. Antes de agarrar la tijera, charlamos: qué querés, cómo es tu pelo y qué te va a durar.',
      media: {
        desktop: { src: heroDesktop, alt: 'Colorista trabajando un balayage en el salón, con luz natural' },
        mobile: { src: heroMobile, alt: 'Colorista trabajando un balayage en el salón, con luz natural' },
      },
    },
    marquee: ['Cortes', 'Balayage', 'Color', 'Keratina', 'Peinados', 'Novias', 'Barbería', 'Corrección de color'],
    services: {
      eyebrow: 'Servicios',
      title: 'Elegí qué te hacés',
      lead: 'Precios "desde": el valor final depende del largo y del estado del pelo. Te lo confirmamos antes de empezar.',
      fromLabel: 'desde',
      consultationLabel: 'Requiere consulta previa',
    },
    gallery: {
      eyebrow: 'Trabajos',
      title: 'Lo que sale de acá',
      lead: 'Trabajos del equipo, con luz natural y sin filtros.',
      beforeLabel: 'Antes',
      afterLabel: 'Después',
    },
    team: {
      eyebrow: 'Equipo',
      title: 'Quiénes te atienden',
      lead: 'Cuatro personas, cada una con su especialidad. Podés elegir con quién reservar.',
    },
    salon: {
      eyebrow: 'El salón',
      title: 'Un lugar para bajar un cambio',
      philosophy: [
        'Damos turnos largos para no correr: cada servicio arranca con un diagnóstico de tu pelo y termina cuando te ves bien, no cuando se cumple el horario.',
        'Trabajamos pocas cabezas por día y con productos profesionales que también podés llevarte para cuidar el resultado en casa.',
      ],
      photos: [
        { src: salonChairs, alt: 'Sillones de corte frente a espejos redondos, con luz de ventana' },
        { src: salonWash, alt: 'Zona de lavado con sillones reclinables y plantas' },
        { src: salonShelf, alt: 'Estante de madera con productos de cuidado capilar' },
        { src: salonFront, alt: 'Fachada del salón sobre una calle arbolada de Palermo' },
      ],
    },
    products: {
      title: 'Lo que usamos (y te podés llevar)',
      lead: 'Líneas profesionales elegidas por su resultado, no por la marca.',
      lines: [
        {
          name: 'Color sin amoníaco',
          description: 'Tintes de baja agresividad para raíz, global y baños de color.',
          usedInSalon: true,
          forSale: false,
        },
        {
          name: 'Reparación y nutrición',
          description: 'Shampoo, máscara y sérum para pelo procesado o con decoloración.',
          usedInSalon: true,
          forSale: true,
        },
        {
          name: 'Rulos y ondas',
          description: 'Cremas de peinar y geles livianos para definir sin apelmazar.',
          usedInSalon: true,
          forSale: true,
        },
        {
          name: 'Barbería',
          description: 'Aceites y bálsamos para barba, ceras de fijación media.',
          usedInSalon: true,
          forSale: true,
        },
      ],
    },
    testimonials: {
      eyebrow: 'Opiniones',
      title: 'Lo que nos dicen',
      placeholderNotice: 'Opiniones de ejemplo para el sitio de demostración.',
    },
    finalCta: {
      title: '¿Te damos un turno?',
      lead: 'Elegí el servicio, reservá online o escribinos y lo coordinamos.',
    },
  },

  commercial: {
    promos: [
      {
        id: 'color-martes-miercoles',
        title: 'Martes y miércoles, 15% off en color',
        description: 'Raíz, global, mechas y balayage con 15% de descuento los martes y miércoles.',
        conditions: [
          'Válido martes y miércoles con turno previo.',
          'Aplica sobre servicios de la categoría color; no incluye corrección de color.',
          'No acumulable con el descuento por pago en efectivo o transferencia.',
        ],
        announce: true,
        active: true,
      },
    ],
    giftCards: {
      title: 'Gift cards',
      description: 'Regalá un servicio o un monto para usar en cualquier servicio del salón. Vencen a los 6 meses.',
      notice: 'En este sitio las gift cards son solo informativas: se piden por WhatsApp.',
      amounts: [30000, 60000, 100000],
    },
    deposit: {
      minDurationMinutes: 120,
      percent: 30,
      description:
        'Para servicios de más de 2 horas pedimos una seña del 30% para confirmar el turno. Se descuenta del total.',
    },
    cancellation: {
      noticeHours: 24,
      summary: 'Podés cancelar o reprogramar sin costo hasta 24 h antes del turno.',
      rules: [
        'Cancelando con 24 h o más de anticipación, la seña se devuelve o se pasa a otro turno.',
        'Con menos de 24 h, la seña no se devuelve.',
        'Si llegás más de 15 minutos tarde, puede que tengamos que acortar o reprogramar el servicio.',
      ],
    },
    paymentDiscount: {
      percent: 10,
      methods: ['efectivo', 'transferencia'],
      description: '10% off pagando en efectivo o por transferencia.',
    },
    paymentMethods: ['Efectivo', 'Transferencia', 'Débito', 'Crédito'],
  },

  faq: [
    {
      question: '¿Por qué los precios dicen "desde"?',
      answer:
        'Porque el valor final depende del largo, la densidad y el estado del pelo. Te lo confirmamos en el diagnóstico, antes de empezar.',
    },
    {
      question: '¿Tengo que dejar seña?',
      answer:
        'Solo en servicios de más de 2 horas, como balayage, keratina o novias. Es del 30% y se descuenta del total.',
    },
    {
      question: '¿Puedo cancelar o cambiar el turno?',
      answer: 'Sí, sin costo hasta 24 h antes. Con menos aviso, la seña no se devuelve.',
    },
    {
      question: '¿La consulta de color tiene costo?',
      answer:
        'No. Para corrección de color y novias hacemos una consulta previa sin cargo, en el salón o por WhatsApp con fotos.',
    },
    {
      question: '¿La keratina tiene formol?',
      answer: 'No. Usamos alisados sin formol y te contamos antes cuánto dura según tu tipo de pelo.',
    },
    {
      question: '¿Atienden chicos?',
      answer: 'Sí, cortes para chicos de hasta 12 años, con turnos tranquilos para que no se aburran.',
    },
  ],

  testimonials: [
    {
      quote: 'Fui con miedo por un color que me habían arruinado y salí con el pelo que quería. Me explicaron todo antes de empezar.',
      author: 'Clienta de ejemplo',
      service: 'Corrección de color',
      placeholder: true,
    },
    {
      quote: 'Primer lugar donde no siento que me están apurando. El corte me dura un montón.',
      author: 'Cliente de ejemplo',
      service: 'Corte de mujer',
      placeholder: true,
    },
    {
      quote: 'Corte y barba impecables, y te dan un café mientras esperás. Ya tengo mi barbero.',
      author: 'Cliente de ejemplo',
      service: 'Corte + barba',
      placeholder: true,
    },
  ],

  demoNotice: {
    enabled: true,
    text: 'Sitio de demostración: la peluquería, el equipo y los precios son ficticios.',
  },
};
