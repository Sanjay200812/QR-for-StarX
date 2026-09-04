import { starxConfig } from "@/config/starx";

export interface ShareOptions {
  onSuccess?: () => void;
  onCopied?: () => void;
  onError?: (err: unknown) => void;
}

export async function shareWebsite(options?: ShareOptions): Promise<void> {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareData = {
    title: starxConfig.brandName,
    text: `${starxConfig.tagline} Follow and connect with ${starxConfig.brandName}.`,
    url: currentUrl,
  };

  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      await navigator.share(shareData);
      options?.onSuccess?.();
      return;
    } catch (err: unknown) {
      // If user aborted share dialog, do nothing
      if (err instanceof DOMException && err.name === "AbortError") {
        return;
      }
      // Fallback to clipboard on error
    }
  }

  // Fallback to clipboard
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(currentUrl);
      options?.onCopied?.();
    } else {
      // Fallback for non-secure contexts or legacy browsers
      const textArea = document.createElement("textarea");
      textArea.value = currentUrl;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      options?.onCopied?.();
    }
  } catch (copyErr) {
    options?.onError?.(copyErr);
  }
}
