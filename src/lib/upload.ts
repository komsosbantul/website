/**
 * Helper to upload an image to Cloudflare R2 via our internal API route.
 * @param file The image file to upload
 * @param folder Folder category (e.g. 'news', 'gallery', 'editor')
 * @returns The public URL of the uploaded image
 */
export async function uploadToR2(file: File, folder = "general"): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.success) {
    const errorMsg = data?.error || `Upload gagal dengan status HTTP ${response.status}`;
    throw new Error(errorMsg);
  }

  return data.url;
}
