/**
 * Helper to ensure images load reliably in Indonesia.
 * Indonesian ISPs (Telkomsel, IndiHome) often block direct *.r2.dev domains via Internet Baik.
 * This helper automatically routes any *.r2.dev image through our internal /api/media proxy.
 */
export function formatImageUrl(url: string | null | undefined): string {
  if (!url) return "";
  
  // If already relative or local
  if (url.startsWith("/")) return url;

  // If it points to Cloudflare R2 dev URL
  const r2DevMatch = url.match(/https?:\/\/[^\/]+\.r2\.dev\/(.*)/);
  if (r2DevMatch && r2DevMatch[1]) {
    return `/api/media/${r2DevMatch[1]}`;
  }

  return url;
}
