export function extractPublicId(url: string): string {
  const pathArray = url.split("/");
  const startIndex = pathArray.findIndex(
    (segment) => segment === "signs_lang_app",
  );
  const publicIdWithExt = pathArray.slice(startIndex).join("/");
  const publicId = publicIdWithExt.replace(/\.[^/.]+$/, "");

  return publicId;
}
