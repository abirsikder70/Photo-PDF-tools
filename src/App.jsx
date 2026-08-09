import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/layout/ScrollToTop'
import RouteLoader from './components/ui/RouteLoader'

import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'

const ImageTools = lazy(() => import('./pages/ImageTools'))
const PdfTools = lazy(() => import('./pages/PdfTools'))

const CompressImage = lazy(() => import('./pages/image/CompressImage'))
const ResizeImage = lazy(() => import('./pages/image/ResizeImage'))
const CropImage = lazy(() => import('./pages/image/CropImage'))
const JpgToPng = lazy(() => import('./pages/image/JpgToPng'))
const PngToJpg = lazy(() => import('./pages/image/PngToJpg'))
const ToWebp = lazy(() => import('./pages/image/ToWebp'))
const FromWebp = lazy(() => import('./pages/image/FromWebp'))
const CompareImage = lazy(() => import('./pages/image/CompareImage'))
const RotateFlip = lazy(() => import('./pages/image/RotateFlip'))

const MergePdf = lazy(() => import('./pages/pdf/MergePdf'))
const SplitPdf = lazy(() => import('./pages/pdf/SplitPdf'))
const CompressPdf = lazy(() => import('./pages/pdf/CompressPdf'))
const JpgToPdf = lazy(() => import('./pages/pdf/JpgToPdf'))
const PdfToJpg = lazy(() => import('./pages/pdf/PdfToJpg'))
const ReorderPdf = lazy(() => import('./pages/pdf/ReorderPdf'))
const RotatePdf = lazy(() => import('./pages/pdf/RotatePdf'))
const DeletePdfPages = lazy(() => import('./pages/pdf/DeletePdfPages'))

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/image-tools" element={<ImageTools />} />
            <Route path="/pdf-tools" element={<PdfTools />} />
            <Route path="/about" element={<About />} />

            {/* Image tools */}
            <Route path="/image/compress" element={<CompressImage />} />
            <Route path="/image/resize" element={<ResizeImage />} />
            <Route path="/image/crop" element={<CropImage />} />
            <Route path="/image/jpg-to-png" element={<JpgToPng />} />
            <Route path="/image/png-to-jpg" element={<PngToJpg />} />
            <Route path="/image/to-webp" element={<ToWebp />} />
            <Route path="/image/from-webp" element={<FromWebp />} />
            <Route path="/image/compare" element={<CompareImage />} />
            <Route path="/image/rotate-flip" element={<RotateFlip />} />

            {/* PDF tools */}
            <Route path="/pdf/merge" element={<MergePdf />} />
            <Route path="/pdf/split" element={<SplitPdf />} />
            <Route path="/pdf/compress" element={<CompressPdf />} />
            <Route path="/pdf/jpg-to-pdf" element={<JpgToPdf />} />
            <Route path="/pdf/pdf-to-jpg" element={<PdfToJpg />} />
            <Route path="/pdf/reorder" element={<ReorderPdf />} />
            <Route path="/pdf/rotate" element={<RotatePdf />} />
            <Route path="/pdf/delete-pages" element={<DeletePdfPages />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}
