import { site } from '../config/site';
import type { Service } from './services';

export const salonId = `${site.url}/#salon`;

/** schema.org HairSalon for every page. */
export function hairSalonSchema(imageUrl: string): Record<string, unknown> {
  const { address } = site;
  return {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    '@id': salonId,
    name: site.brand.name,
    description: site.brand.description,
    url: site.url,
    telephone: site.contact.phone,
    email: site.contact.email,
    image: imageUrl,
    priceRange: site.seo.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: `${address.neighborhood}, ${address.city}`,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: address.geo.lat, longitude: address.geo.lng },
    hasMap: address.mapsUrl,
    openingHoursSpecification: site.hours
      .filter((h) => h.opens && h.closes)
      .map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
        opens: h.opens,
        closes: h.closes,
      })),
    sameAs: [site.social.instagram.url, ...site.social.others.map((o) => o.url)],
  };
}

/** ItemList of Service + Offer for the full carta. */
export function servicesSchema(services: Service[], pageUrl: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    url: pageUrl,
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.data.name,
        description: s.data.description,
        serviceType: s.data.category,
        provider: { '@id': salonId },
        areaServed: `${site.address.neighborhood}, ${site.address.region}`,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'ARS',
          priceSpecification: {
            '@type': 'PriceSpecification',
            minPrice: s.data.priceFrom,
            priceCurrency: 'ARS',
          },
        },
      },
    })),
  };
}
