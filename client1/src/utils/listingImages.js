const defaultImages = [
  "/house1.avif",
  "/house2.jpeg",
  "/house3.webp",
  "/house4.jpeg",
  "/house5.jpeg",
  "/house6.webp",
  "/house7.avif",
  "/house8.webp",
  "/house9.jpeg",
  "/house10.jpeg",
  "/house11.jpeg",
  "/images11.jpg",
  "/images12.jpeg",
  "/images13.jpg",
  "/images14.jpeg",
  "/images15.jpeg",
  "/images16.jpeg",
  "/.images17.jpeg",
  "/images18.jpeg",
  "/images19.avif",
];

export function getListingImages(listing) {
  if (listing.imageUrls?.length > 0) {
    return listing.imageUrls;
  }

  // Choose a consistent fallback image for each listing.
  const id = String(listing._id ?? listing.title ?? "property");
  const index =
    [...id].reduce((total, character) => total + character.charCodeAt(0), 0) %
    defaultImages.length;

  return [defaultImages[index]];
}
