/**
 * Generates a direct WhatsApp link to an empty chat with the given phone number.
 * Opens WhatsApp app on mobile or WhatsApp Web on desktop.
 */
export function getWhatsAppUrl(rawPhone: string): string {
  // Clean non-digits
  const cleanNumber = rawPhone.replace(/\D/g, "");
  return `https://wa.me/${cleanNumber}`;
}
