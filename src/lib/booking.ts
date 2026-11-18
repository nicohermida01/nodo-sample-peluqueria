import { site } from '../config/site';

interface BookingTarget {
  service?: string;
  stylist?: string;
}

/** wa.me link with the prefilled message from site.ts. */
export function whatsappHref(message: string = site.booking.whatsapp.generic): string {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Prefilled WhatsApp message for a service and/or stylist. */
export function bookingMessage({ service, stylist }: BookingTarget = {}): string {
  const t = site.booking.whatsapp;
  const template =
    service && stylist ? t.serviceWithStylist : service ? t.service : stylist ? t.stylist : t.generic;
  // Callbacks insert names literally (no "$&"-style replacement patterns).
  return template
    .replaceAll('{service}', () => service ?? '')
    .replaceAll('{stylist}', () => stylist ?? '');
}

/**
 * Every "Reservar" button uses this: the external booking system when configured,
 * otherwise WhatsApp with the prefilled message.
 */
export function bookingHref(target: BookingTarget = {}): string {
  return site.booking.externalUrl || whatsappHref(bookingMessage(target));
}

export const isExternalBooking = (): boolean => site.booking.externalUrl !== '';
