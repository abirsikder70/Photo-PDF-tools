# PixelTools — Stage 2 Plan: Implement all Image Tools

**Goal:** Every image tool page becomes fully functional — real processing, previews,
file info, download, loading states and clear errors. All processing stays in the
browser (native Canvas API). No new "fake" features.

## Library decision (updated)

- **Compress / Resize / Convert / Rotate-Flip / Compare:** native **Canvas API**
  (`drawImage` + `canvas.toBlob`). Chosen over `browser-image-compression` because that
  library optimizes toward a **max file size** and would over-compress (or skip) a
  quality-slider tool; native `toBlob(quality)` gives exact, predictable quality control.
- **Crop:** **react-easy-crop** (reliable open-source crop UI with drag + resize handles).
- New dependency: only `react-easy-crop`.

## Files to create

| File | Purpose |
| --- | --- |
| `src/utils/format.js` | `formatBytes` shared formatter |
| `src/utils/image.js` | `loadImageFromUrl/File`, `canvasToBlob`, `drawImageToCanvas`, `getCroppedBlob`, mime/extension helpers |
| `src/hooks/useImageUpload.js` | shared upload state: file, preview URL, dimensions, errors |
| `src/components/ui/ToolResultPanel.jsx` | result preview + dimensions/size/savings chips + DownloadButton |

## Files to modify

| File | Change |
| --- | --- |
| `src/components/ui/FilePreview.jsx` | add `large` (big preview) + `dimensions` support |

## Tools (all in `src/pages/image/`)

1. **CompressImage** — quality slider → canvas → `toBlob(quality)`. PNG sources convert to JPG (PNG is lossless) with a note. Shows original vs compressed size + savings.
2. **ResizeImage** — percent or exact pixels, "keep aspect ratio" lock, live output dimensions.
3. **CropImage** — `react-easy-crop` free crop box → `getCroppedBlob`.
4. **JpgToPng** — JPG → `image/png` (transparency supported).
5. **PngToJpg** — PNG → white background fill → `image/jpeg`.
6. **ToWebp** — JPG/PNG → `image/webp` + quality slider.
7. **FromWebp** — WebP → JPG or PNG (radio choice; JPG fills white).
8. **CompareImage** — original vs compressed side by side with sizes + savings, download compressed.
9. **RotateFlip** — rotate 90°/180°/270°, flip H/V, live transformed preview, download.

## Behavior requirements (all tools)

- Drag-drop + click-to-browse upload (`FileUploader`, `accept="image/*"`)
- Show original preview, file size and dimensions after upload
- Loading state while processing (`LoadingState`), clear errors (`ErrorMessage`)
- Result preview + output size/dimensions + `DownloadButton`

## Verification

1. `npm run lint` — clean.
2. `npm run build` — zero errors.
3. `npm run dev` — manually exercise each of the 9 tools with sample images.
