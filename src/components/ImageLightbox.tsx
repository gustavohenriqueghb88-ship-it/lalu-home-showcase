import { useCallback, useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface ImageLightboxProps {
  images: string[];
  open: boolean;
  initialIndex?: number;
  onOpenChange: (open: boolean) => void;
  alt?: string;
}

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const STEP = 0.5;

export default function ImageLightbox({
  images,
  open,
  initialIndex = 0,
  onOpenChange,
  alt = "Imagem",
}: ImageLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const pinch = useRef<{ dist: number; scale: number } | null>(null);

  const reset = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (open) {
      setIndex(initialIndex);
      reset();
    }
  }, [open, initialIndex, reset]);

  const prev = useCallback(() => {
    if (images.length < 2) return;
    setIndex((i) => (i - 1 + images.length) % images.length);
    reset();
  }, [images.length, reset]);

  const next = useCallback(() => {
    if (images.length < 2) return;
    setIndex((i) => (i + 1) % images.length);
    reset();
  }, [images.length, reset]);

  const zoomIn = useCallback(() => setScale((s) => Math.min(MAX_SCALE, +(s + STEP).toFixed(2))), []);
  const zoomOut = useCallback(() => {
    setScale((s) => {
      const ns = Math.max(MIN_SCALE, +(s - STEP).toFixed(2));
      if (ns === 1) setOffset({ x: 0, y: 0 });
      return ns;
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "+" || e.key === "=") zoomIn();
      else if (e.key === "-" || e.key === "_") zoomOut();
      else if (e.key === "0") reset();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, prev, next, zoomIn, zoomOut, reset]);

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) zoomIn();
    else zoomOut();
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (scale <= 1) return;
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
    (e.target as Element).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    setOffset((o) => ({ x: o.x + dx, y: o.y + dy }));
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinch.current = { dist: Math.hypot(dx, dy), scale };
    }
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinch.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const ratio = dist / pinch.current.dist;
      const ns = Math.max(MIN_SCALE, Math.min(MAX_SCALE, pinch.current.scale * ratio));
      setScale(+ns.toFixed(2));
      if (ns === 1) setOffset({ x: 0, y: 0 });
    }
  };
  const onTouchEnd = () => {
    pinch.current = null;
  };

  if (!images || images.length === 0) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[100vw] w-screen h-screen sm:max-w-[100vw] p-0 border-0 bg-black/95 rounded-none sm:rounded-none flex flex-col">
        {/* Header counter */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 text-white/80 text-sm font-medium px-3 py-1 rounded-full bg-black/40 backdrop-blur">
          {index + 1} / {images.length}
        </div>

        {/* Image area */}
        <div
          className="relative flex-1 overflow-hidden flex items-center justify-center select-none touch-none"
          onWheel={onWheel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{ cursor: scale > 1 ? (dragging.current ? "grabbing" : "grab") : "default" }}
        >
          <img
            src={images[index]}
            alt={`${alt} ${index + 1}`}
            draggable={false}
            className="max-w-[95vw] max-h-[85vh] object-contain transition-transform duration-150 ease-out"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            }}
          />

          {/* Prev / Next */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Imagem anterior"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/10 hover:bg-secondary hover:text-primary text-white flex items-center justify-center transition-colors backdrop-blur"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Próxima imagem"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/10 hover:bg-secondary hover:text-primary text-white flex items-center justify-center transition-colors backdrop-blur"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {/* Controls bar */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-black/50 backdrop-blur px-3 py-2 rounded-full">
          <button
            type="button"
            onClick={zoomOut}
            aria-label="Diminuir zoom"
            disabled={scale <= MIN_SCALE}
            className="h-9 w-9 rounded-full bg-white/10 hover:bg-secondary hover:text-primary text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <span className="text-white/80 text-xs font-mono w-12 text-center">{Math.round(scale * 100)}%</span>
          <button
            type="button"
            onClick={zoomIn}
            aria-label="Aumentar zoom"
            disabled={scale >= MAX_SCALE}
            className="h-9 w-9 rounded-full bg-white/10 hover:bg-secondary hover:text-primary text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={reset}
            aria-label="Restaurar zoom"
            className="h-9 w-9 rounded-full bg-white/10 hover:bg-secondary hover:text-primary text-white flex items-center justify-center transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
