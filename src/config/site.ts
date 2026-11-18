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
import salonArch from '../assets/salon/salon-arco.jpg';
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

/**
 * Headline copy. Wrap ONE word or short phrase in *asterisks* to render it
 * in italic bronze (e.g. "Pelo con criterio, turnos *sin apuro*.").
 */
export type Headline = string;

/** Lucide icon names available for the proposal strip (see components/ui/Icon.astro). */
export type ProposalIcon = 'clock' | 'messages' | 'droplet' | 'banknote';

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

export interface PageSeo {
  /** Inserted into seo.titleTemplate. */
  title: string;
  description: string;
}

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export interface SiteConfig {
  url: string;
  lang: string;
  locale: string;
  brand: {
    name: string;
    shortName: string;
    /** Small line next to the wordmark in the header. */
    descriptor: string;
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
    /** Browser UI color. Keep it equal to --color-bg in global.css. */
    themeColor: string;
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
  ui: {
    skipLink: string;
    homeLabel: string;
    mainNavLabel: string;
    menuOpen: string;
    menuClose: string;
    announcementLink: string;
    whatsappIconLabel: string;
    /** Opens in a new tab: appended to the accessible name of external links. */
    newTabHint: string;
  };
  copy: {
    hero: {
      title: Headline;
      lead: string;
      media: { desktop: Photo; mobile: Photo };
      cartaLabel: string;
      cartaMore: string;
    };
    marquee: string[];
    proposal: { label: string; items: { title: string; text: string; icon: ProposalIcon }[] };
    services: {
      title: Headline;
      lead: string;
      fromLabel: string;
      consultationLabel: string;
      consultationCta: string;
      bookLabel: string;
      /** {percent} is replaced by the deposit percent. */
      depositNote: string;
      stylistsLabel: string;
      featuredTitle: Headline;
      featuredLead: string;
      /** {n} is replaced by the number of services in the category. */
      categoryCount: string;
      categoryFromLabel: string;
      seeCategory: string;
      seeAll: string;
      categoryNavLabel: string;
      prevLabel: string;
      nextLabel: string;
    };
    gallery: {
      title: Headline;
      lead: string;
      beforeLabel: string;
      afterLabel: string;
      compareLabel: string;
      seeAll: string;
      filterCategory: string;
      filterStylist: string;
      allLabel: string;
      /** {n} is replaced by the number of works shown. */
      countOne: string;
      countOther: string;
      empty: string;
      openLabel: string;
      byLabel: string;
      lightbox: { label: string; close: string; prev: string; next: string };
    };
    team: {
      title: Headline;
      lead: string;
      profileLabel: string;
      /** {name} is replaced by the stylist's first name. */
      bookWith: string;
      /** {n} is replaced by years of experience. */
      years: string;
      specialtiesLabel: string;
      signatureTitle: Headline;
      allServicesTitle: string;
      worksTitle: string;
      othersTitle: string;
      backLabel: string;
    };
    /** archPhoto must be portrait (3:4): it is cropped into the signature arch. */
    salon: { title: Headline; philosophy: string[]; archPhoto: Photo; photos: Photo[] };
    products: {
      title: string;
      lead: string;
      lines: ProductLine[];
      usedLabel: string;
      forSaleLabel: string;
    };
    testimonials: { title: Headline; placeholderNotice: string };
    promos: {
      title: Headline;
      lead: string;
      conditionsLabel: string;
      giftCardCta: string;
      amountsLabel: string;
      policyTitle: string;
      depositLabel: string;
      cancellationLabel: string;
      paymentLabel: string;
      policyLink: string;
    };
    location: {
      title: Headline;
      addressTitle: string;
      hoursTitle: string;
      closedLabel: string;
      contactTitle: string;
      mapButton: string;
      mapFrameTitle: string;
      mapNotice: string;
      mapsLink: string;
    };
    faq: { title: Headline };
    finalCta: { title: Headline; lead: string };
    footer: { navTitle: string; legalTitle: string; contactTitle: string; hoursTitle: string; closing: string };
    notFound: { title: Headline; lead: string; homeLabel: string; servicesLabel: string };
  };
  pages: {
    services: PageSeo & { heading: Headline };
    gallery: PageSeo & { heading: Headline };
    team: PageSeo & { heading: Headline };
    privacy: PageSeo;
    booking: PageSeo;
    notFound: PageSeo;
  };
  legal: {
    privacy: { title: string; lead: string; sections: LegalSection[] };
    booking: {
      title: string;
      lead: string;
      depositTitle: string;
      depositServicesLabel: string;
      cancellationTitle: string;
      paymentTitle: string;
      paymentMethodsLabel: string;
      promosTitle: string;
      giftCardsTitle: string;
    };
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

/** Shared with the proposal strip so the discount is written once. */
const paymentDiscount = {
  percent: 10,
  methods: ['efectivo', 'transferencia'],
  description: '10% off pagando en efectivo o por transferencia.',
};

export const site: SiteConfig = {
  url: 'https://nodo-sample-peluqueria.vercel.app',
  lang: 'es-AR',
  locale: 'es_AR',

  brand: {
    name: 'NUDO Estudio de Pelo',
    shortName: 'NUDO',
    descriptor: 'Estudio de Pelo',
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
    themeColor: '#F4EEE5',
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

  ui: {
    skipLink: 'Saltar al contenido',
    homeLabel: 'NUDO Estudio de Pelo, inicio',
    mainNavLabel: 'Principal',
    menuOpen: 'Abrir menú',
    menuClose: 'Cerrar menú',
    announcementLink: 'Ver condiciones',
    whatsappIconLabel: 'Escribinos por WhatsApp',
    newTabHint: '(se abre en otra pestaña)',
  },

  copy: {
    hero: {
      title: 'Pelo con criterio, turnos *sin apuro*.',
      lead: 'Antes de agarrar la tijera charlamos: qué querés, cómo es tu pelo y qué te va a durar.',
      media: {
        desktop: { src: heroDesktop, alt: 'Colorista trabajando un balayage en el salón, con luz natural' },
        mobile: { src: heroMobile, alt: 'Colorista trabajando un balayage en el salón, con luz natural' },
      },
      cartaLabel: 'Carta de servicios',
      cartaMore: 'Ver la carta completa',
    },
    marquee: ['Cortes', 'Balayage', 'Color', 'Keratina', 'Peinados', 'Novias', 'Barbería', 'Corrección de color'],
    proposal: {
      label: 'Cómo trabajamos',
      items: [
        {
          icon: 'clock',
          title: 'Turnos largos',
          text: 'No encimamos turnos: cada servicio tiene su tiempo y termina cuando te ves bien.',
        },
        {
          icon: 'messages',
          title: 'Diagnóstico primero',
          text: 'Antes de empezar miramos tu pelo y charlamos qué querés y qué te va a durar.',
        },
        {
          icon: 'droplet',
          title: 'Productos profesionales',
          text: 'Color sin amoníaco y líneas de cuidado que también podés llevarte a casa.',
        },
        {
          icon: 'banknote',
          title: `${paymentDiscount.percent}% off`,
          text: `Pagando en ${paymentDiscount.methods.join(' o por ')}.`,
        },
      ],
    },
    services: {
      title: 'Elegí qué te hacés',
      lead: 'Precios "desde": el valor final depende del largo y del estado del pelo. Te lo confirmamos antes de empezar.',
      fromLabel: 'desde',
      consultationLabel: 'Requiere consulta previa',
      consultationCta: 'Pedir consulta',
      bookLabel: 'Reservar',
      depositNote: 'Con seña del {percent}%',
      stylistsLabel: 'Lo hacen',
      featuredTitle: 'Una carta corta, bien hecha',
      featuredLead: 'Entrá por la categoría que te interese y mirá precios y tiempos antes de reservar.',
      categoryCount: '{n} servicios',
      categoryFromLabel: 'desde',
      seeCategory: 'Ver servicios',
      seeAll: 'Ver la carta completa',
      categoryNavLabel: 'Categorías de servicios',
      prevLabel: 'Anterior',
      nextLabel: 'Siguiente',
    },
    gallery: {
      title: 'Lo que sale de acá',
      lead: 'Trabajos del equipo, con luz natural y sin filtros.',
      beforeLabel: 'Antes',
      afterLabel: 'Después',
      compareLabel: 'Comparar antes y después',
      seeAll: 'Ver todos los trabajos',
      filterCategory: 'Tipo de trabajo',
      filterStylist: 'Estilista',
      allLabel: 'Todos',
      countOne: '{n} trabajo',
      countOther: '{n} trabajos',
      empty: 'No hay trabajos con esa combinación. Probá con otro filtro.',
      openLabel: 'Ver en grande',
      byLabel: 'Por',
      lightbox: { label: 'Trabajo ampliado', close: 'Cerrar', prev: 'Trabajo anterior', next: 'Trabajo siguiente' },
    },
    team: {
      title: 'Quiénes te atienden',
      lead: 'Cuatro personas, cada una con su especialidad. Podés elegir con quién reservar.',
      profileLabel: 'Ver perfil',
      bookWith: 'Reservar con {name}',
      years: '{n} años de oficio',
      specialtiesLabel: 'Especialidades',
      signatureTitle: 'Lo que más pide la gente',
      allServicesTitle: 'Todo lo que hace',
      worksTitle: 'Sus trabajos',
      othersTitle: 'El resto del equipo',
      backLabel: 'Todo el equipo',
    },
    salon: {
      title: 'Un lugar para *bajar* un cambio',
      philosophy: [
        'Damos turnos largos para no correr: cada servicio arranca con un diagnóstico de tu pelo y termina cuando te ves bien, no cuando se cumple el horario.',
        'Trabajamos pocas cabezas por día y con productos profesionales que también podés llevarte para cuidar el resultado en casa.',
      ],
      archPhoto: { src: salonArch, alt: 'Sillón de corte frente a un espejo ovalado, con luz de ventana' },
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
      usedLabel: 'En el salón',
      forSaleLabel: 'A la venta',
    },
    testimonials: {
      title: 'Lo que nos dicen',
      placeholderNotice: 'Opiniones de ejemplo para el sitio de demostración.',
    },
    promos: {
      title: 'Promos y gift cards',
      lead: 'Todo con sus condiciones a la vista, sin letra chica.',
      conditionsLabel: 'Condiciones',
      giftCardCta: 'Pedir una gift card',
      amountsLabel: 'Montos sugeridos',
      policyTitle: 'Antes de reservar',
      depositLabel: 'Seña',
      cancellationLabel: 'Cancelaciones',
      paymentLabel: 'Pago',
      policyLink: 'Ver la política de turnos',
    },
    location: {
      title: 'Dónde estamos',
      addressTitle: 'Dirección',
      hoursTitle: 'Horarios',
      closedLabel: 'Cerrado',
      contactTitle: 'Contacto',
      mapButton: 'Ver mapa',
      mapFrameTitle: 'Mapa con la ubicación del salón',
      mapNotice: 'El mapa se carga desde Google Maps recién cuando tocás el botón.',
      mapsLink: 'Abrir en Google Maps',
    },
    faq: { title: 'Preguntas frecuentes' },
    finalCta: {
      title: '¿Te damos un *turno*?',
      lead: 'Elegí el servicio, reservá online o escribinos y lo coordinamos.',
    },
    footer: {
      navTitle: 'Sitio',
      legalTitle: 'Legales',
      contactTitle: 'Contacto',
      hoursTitle: 'Horarios',
      closing: 'Peluquería de autor en Palermo.',
    },
    notFound: {
      title: 'Esta página se nos escapó',
      lead: 'Puede que el link esté viejo o mal escrito. Volvé al inicio o mirá la carta de servicios.',
      homeLabel: 'Ir al inicio',
      servicesLabel: 'Ver servicios',
    },
  },

  pages: {
    services: {
      title: 'Servicios y precios',
      description:
        'Carta completa de NUDO, peluquería en Palermo: cortes, color, balayage en Palermo, keratina, peinados y barbería, con precios "desde" y duración.',
      heading: 'La *carta* completa',
    },
    gallery: {
      title: 'Trabajos',
      description:
        'Cortes, balayage, color, peinados y barbería hechos en NUDO, peluquería en Palermo. Filtrá por tipo de trabajo o por estilista.',
      heading: 'Trabajos del equipo',
    },
    team: {
      title: 'Equipo',
      description:
        'Conocé al equipo de NUDO, peluquería en Palermo: coloristas, estilistas y barbería. Elegí con quién reservar tu turno.',
      heading: 'Quiénes te atienden',
    },
    privacy: {
      title: 'Política de privacidad',
      description: 'Qué datos maneja el sitio de NUDO Estudio de Pelo y cómo los tratamos.',
    },
    booking: {
      title: 'Turnos y cancelaciones',
      description: 'Seña, cancelaciones, medios de pago, promos y gift cards de NUDO, peluquería en Palermo.',
    },
    notFound: {
      title: 'Página no encontrada',
      description: 'La página que buscás no existe o cambió de lugar.',
    },
  },

  legal: {
    privacy: {
      title: 'Política de privacidad',
      lead: 'Este es un sitio informativo: no tiene formularios, cuentas ni pagos. Te contamos qué pasa con tus datos cuando lo usás.',
      sections: [
        {
          heading: 'Qué datos juntamos',
          paragraphs: [
            'Ninguno de forma directa. El sitio no tiene formularios, registro de usuarios ni cookies propias, y no usamos herramientas de analítica ni publicidad.',
            'Como cualquier sitio web, el servicio de hosting puede registrar datos técnicos de las visitas (por ejemplo, la dirección IP y el navegador) por razones de seguridad.',
          ],
        },
        {
          heading: 'WhatsApp y sistema de turnos',
          paragraphs: [
            'Cuando tocás "Reservar" o el botón de WhatsApp, salís de este sitio. Lo que escribas queda en WhatsApp o en el sistema de turnos, que tienen sus propias políticas de privacidad.',
            'Usamos tu nombre y tu teléfono solo para coordinar el turno y avisarte cambios. No los compartimos ni los usamos para enviarte publicidad.',
          ],
        },
        {
          heading: 'Mapa',
          paragraphs: [
            'El mapa de Google Maps se carga recién si tocás "Ver mapa". A partir de ese momento, Google puede usar cookies según su propia política.',
          ],
        },
        {
          heading: 'Tus derechos',
          paragraphs: [
            'Según la Ley 25.326 de Protección de Datos Personales, podés pedirnos acceso, corrección o eliminación de los datos que nos hayas dado. Escribinos por mail o por WhatsApp: los datos de contacto están al pie de la página.',
          ],
        },
      ],
    },
    booking: {
      title: 'Turnos y cancelaciones',
      lead: 'Queremos que llegues tranquila o tranquilo y sepas de antemano cómo funciona todo. Estas son las reglas del salón.',
      depositTitle: 'Seña',
      depositServicesLabel: 'Servicios que llevan seña',
      cancellationTitle: 'Cancelaciones y cambios',
      paymentTitle: 'Medios de pago',
      paymentMethodsLabel: 'Aceptamos',
      promosTitle: 'Promos vigentes',
      giftCardsTitle: 'Gift cards',
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
    paymentDiscount,
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
