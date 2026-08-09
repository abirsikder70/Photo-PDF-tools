/**
 * tools.js — Single source of truth for every PixelTools tool.
 *
 * Add or edit a tool here and it will automatically show up on the
 * homepage, the tool listing pages, and its own tool page.
 */

export const categories = {
  image: {
    id: 'image',
    label: 'Image Tools',
    shortLabel: 'Image',
    path: '/image-tools',
    description:
      'Compress, resize, crop, convert and enhance your images — right in your browser.',
  },
  pdf: {
    id: 'pdf',
    label: 'PDF Tools',
    shortLabel: 'PDF',
    path: '/pdf-tools',
    description:
      'Merge, split, compress and organize your PDFs — privately and for free.',
  },
}

export const tools = [
  // ---------------- IMAGE TOOLS ----------------
  {
    slug: 'compress',
    name: 'Compress Image',
    category: 'image',
    path: '/image/compress',
    icon: 'compress',
    tagline: 'Reduce image file size while keeping quality.',
    description:
      'Shrink the size of your JPG or PNG images by adjusting the compression quality, with a live preview of the savings.',
  },
  {
    slug: 'resize',
    name: 'Resize Image',
    category: 'image',
    path: '/image/resize',
    icon: 'resize',
    tagline: 'Change image dimensions by percent or exact pixels.',
    description:
      'Resize your image to an exact width and height or scale it up and down by percentage, and download the result.',
  },
  {
    slug: 'crop',
    name: 'Crop Image',
    category: 'image',
    path: '/image/crop',
    icon: 'crop',
    tagline: 'Remove unwanted areas with a custom crop box.',
    description:
      'Crop your image to the exact area you need by dragging a selection box over the preview.',
  },
  {
    slug: 'jpg-to-png',
    name: 'JPG to PNG',
    category: 'image',
    path: '/image/jpg-to-png',
    icon: 'photo',
    tagline: 'Convert JPG images to transparent PNG.',
    description:
      'Turn a JPG image into a PNG with support for transparency. Great for logos and graphics.',
  },
  {
    slug: 'png-to-jpg',
    name: 'PNG to JPG',
    category: 'image',
    path: '/image/png-to-jpg',
    icon: 'photo',
    tagline: 'Convert PNG images to compact JPG.',
    description:
      'Convert a PNG image to JPG for much smaller file sizes — perfect for photos and sharing.',
  },
  {
    slug: 'to-webp',
    name: 'JPG/PNG to WebP',
    category: 'image',
    path: '/image/to-webp',
    icon: 'convert',
    tagline: 'Convert JPG or PNG images to modern WebP.',
    description:
      'Convert your JPG or PNG images to the modern WebP format, which is smaller and loads faster on the web.',
  },
  {
    slug: 'from-webp',
    name: 'WebP to JPG/PNG',
    category: 'image',
    path: '/image/from-webp',
    icon: 'convert',
    tagline: 'Convert WebP images back to JPG or PNG.',
    description:
      'Convert a WebP image back to the widely compatible JPG or PNG format so it works everywhere.',
  },
  {
    slug: 'compare',
    name: 'Compare Image',
    category: 'image',
    path: '/image/compare',
    icon: 'compare',
    tagline: 'Compare quality and file size side by side.',
    description:
      'Compare two versions of an image side by side to find the best balance between quality and file size.',
  },
  {
    slug: 'rotate-flip',
    name: 'Rotate / Flip Image',
    category: 'image',
    path: '/image/rotate-flip',
    icon: 'rotate',
    tagline: 'Rotate in 90° steps and flip horizontally or vertically.',
    description:
      'Rotate your image clockwise or counter-clockwise, and flip it horizontally or vertically, then download it.',
  },

  // ---------------- PDF TOOLS ----------------
  {
    slug: 'merge',
    name: 'Merge PDF',
    category: 'pdf',
    path: '/pdf/merge',
    icon: 'merge',
    tagline: 'Combine multiple PDFs into a single document.',
    description:
      'Upload two or more PDFs and merge them into one file, in any order you choose.',
  },
  {
    slug: 'split',
    name: 'Split PDF',
    category: 'pdf',
    path: '/pdf/split',
    icon: 'split',
    tagline: 'Extract selected pages into a new PDF.',
    description:
      'Split a PDF by extracting the pages you choose into a brand new document.',
  },
  {
    slug: 'compress',
    name: 'Compress PDF',
    category: 'pdf',
    path: '/pdf/compress',
    icon: 'compress',
    tagline: 'Shrink PDF file size for easier sharing.',
    description:
      'Reduce the file size of your PDF so it is easier to email and share. Note: compression rasterizes pages and may reduce quality.',
  },
  {
    slug: 'jpg-to-pdf',
    name: 'JPG to PDF',
    category: 'pdf',
    path: '/pdf/jpg-to-pdf',
    icon: 'photo',
    tagline: 'Turn images into a PDF document.',
    description:
      'Convert one or more JPG or PNG images into a single PDF file, arranged as pages.',
  },
  {
    slug: 'pdf-to-jpg',
    name: 'PDF to JPG',
    category: 'pdf',
    path: '/pdf/pdf-to-jpg',
    icon: 'pdf',
    tagline: 'Export PDF pages as JPG images.',
    description:
      'Convert the pages of your PDF into high-quality JPG images that you can download one by one or as a zip.',
  },
  {
    slug: 'reorder',
    name: 'Reorder PDF Pages',
    category: 'pdf',
    path: '/pdf/reorder',
    icon: 'reorder',
    tagline: 'Drag pages into a new order.',
    description:
      'See thumbnails of every page and drag them into the order you want, then download the reorganized PDF.',
  },
  {
    slug: 'rotate',
    name: 'Rotate PDF Pages',
    category: 'pdf',
    path: '/pdf/rotate',
    icon: 'rotate',
    tagline: 'Rotate individual or all pages.',
    description:
      'Rotate one page, a range of pages, or the whole document by 90°, 180° or 270°.',
  },
  {
    slug: 'delete-pages',
    name: 'Delete PDF Pages',
    category: 'pdf',
    path: '/pdf/delete-pages',
    icon: 'trash',
    tagline: 'Remove unwanted pages from your PDF.',
    description:
      'Preview every page as a thumbnail, select the ones you want to remove, and download the cleaned PDF.',
  },
]

// Planned PDF tools — shown as "coming soon" on the PDF Tools page.
export const futurePdfTools = [
  { name: 'PDF to Word', icon: 'file' },
  { name: 'Word to PDF', icon: 'file' },
  { name: 'PDF to Excel', icon: 'file' },
  { name: 'PDF Password / Unlock', icon: 'lock' },
  { name: 'PDF Watermark', icon: 'sparkles' },
  { name: 'Add Page Number', icon: 'file' },
]

// Homepage sections — cards reference tool slugs above.
export const homepageSections = [
  {
    section: 'image',
    title: 'Image Tools',
    description:
      'Compress, resize, crop, convert and enhance your images — right in your browser.',
    cards: [
      { slug: 'compress' },
      { slug: 'resize' },
      { slug: 'crop' },
      { slug: 'convert', label: 'Convert Image', icon: 'convert' },
      { slug: 'compare' },
      { slug: 'rotate-flip' },
    ],
  },
  {
    section: 'pdf',
    title: 'PDF Tools',
    description:
      'Merge, split, compress and organize your PDFs — privately and for free.',
    cards: [
      { slug: 'merge' },
      { slug: 'split' },
      { slug: 'compress' },
      { slug: 'jpg-to-pdf' },
      { slug: 'pdf-to-jpg' },
      { slug: 'reorder' },
      { slug: 'rotate' },
      { slug: 'delete-pages' },
    ],
  },
]

export function getToolsByCategory(category) {
  return tools.filter((tool) => tool.category === category)
}

export function getToolByPath(path) {
  return tools.find((tool) => tool.path === path)
}
