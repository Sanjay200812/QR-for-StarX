import { starxConfig } from "@/config/starx";

/**
 * Generates a direct WhatsApp link with prefilled, URL-encoded message.
 * Supports both mobile and desktop browsers natively.
 */
export function getWhatsAppUrl(rawPhone: string, customMessage?: string): string {
  // Clean non-digits
  const cleanNumber = rawPhone.replace(/\D/g, "");
  const message = customMessage ?? starxConfig.whatsappMessage;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}
