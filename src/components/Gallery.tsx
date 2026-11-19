"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { ProjectImage } from "@/data/projects";
import { Tx } from "./Tx";
import { layoutColumns, layoutRows } from "@/lib/rows";

type GalleryProject = {
  title: string;
  images: Pick<ProjectImage, "src" | "caption" | "width" | "height">[];
};

export function Gallery({
  project: p,
  compact = false,
  wideColumns = 4,
}: {
  project: GalleryProject;
  compact?: boolean;
  wideColumns?: number;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const previousZoom = useRef(1);
  const dragged = useRef(false);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const drag = useRef<{
    x: number;
    y: number;
    left: number;
    top: number;
  } | null>(null);
  const [selected, setSelected] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [open, setOpen] = useState(false);
  const current = p.images[selected];
  const ratios = useMemo(
    () => p.images.map((i) => (i.width ?? 1440) / (i.height ?? 1000)),
    [p.images],
  );
  const gap = compact ? { wide: 6, narrow: 4 } : { wide: 16, narrow: 10 };
  const layouts = useMemo(
    () => ({
      wide: layoutRows(ratios, { width: 1100, gap: 16, target: 400, tallTarget: 650, maxHeight: 1500, maxPerRow: 4, tallMinWidth: 665 }),
      narrow: layoutRows(ratios, { width: 350, gap: 10, target: 300, tallTarget: 700, maxHeight: 1800, maxPerRow: 2, tallMinWidth: 350 }),
    }),
    [ratios],
  );
  const columns = useMemo(
    () => ({ wide: layoutColumns(ratios, wideColumns), narrow: layoutColumns(ratios, Math.min(2, wideColumns)) }),
    [ratios, wideColumns],
  );
  const open_ = (index: number) => {
    setSelected(index);
    setZoom(1);
    setOpen(true);
    dialog.current?.showModal();
  };

  useEffect(() => {
    if (!open) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const viewport = stage.current;
    if (!viewport) return;
    // React's onWheel is passive, so a native non-passive listener is needed to stop page scroll.
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 400 : 1;
      const delta = Math.max(-100, Math.min(100, event.deltaY * unit));
      setZoom((value) =>
        Math.min(8, Math.max(1, Math.round(value * Math.exp(-delta * 0.0025) * 100) / 100)),
      );
    };
    viewport.addEventListener("wheel", onWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", onWheel);
  }, [open]);

  useLayoutEffect(() => {
    const viewport = stage.current;
    if (viewport) {
      const factor = zoom / previousZoom.current;
      viewport.scrollLeft =
        (viewport.scrollLeft + viewport.clientWidth / 2) * factor -
        viewport.clientWidth / 2;
      viewport.scrollTop =
        (viewport.scrollTop + viewport.clientHeight / 2) * factor -
        viewport.clientHeight / 2;
    }
    previousZoom.current = zoom;
  }, [zoom]);

  if (!current) return null;
  const changeZoom = (amount: number) =>
    setZoom((value) => Math.min(8, Math.max(1, value + amount)));
  const move = (step: number) => {
    setSelected((index) => (index + step + p.images.length) % p.images.length);
    setZoom(1);
    if (stage.current) stage.current.scrollTo(0, 0);
  };

  return (
    <>
      {(["wide", "narrow"] as const).map((mode) =>
        compact ? (
          <div
            className={`gallery gallery-${mode} gallery-compact`}
            key={mode}
            style={{ gap: gap[mode] }}
          >
            {columns[mode].map((col) => (
              <div className="gallery-col" style={{ gap: gap[mode] }} key={col.join("-")}>
                {col.map((index) => {
                  const image = p.images[index];
                  return (
                    <button
                      key={image.src}
                      className="gallery-zoom"
                      aria-label={`Enlarge ${p.title}: ${image.caption}`}
                      onClick={() => open_(index)}
                    >
                      <Image
                        src={image.src}
                        alt={`${p.title}: ${image.caption}`}
                        width={image.width ?? 1440}
                        height={image.height ?? 1000}
                        sizes="(min-width: 720px) 275px, 50vw"
                      />
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        ) : (
          <div className={`gallery gallery-${mode}`} key={mode}>
            {layouts[mode].map((row) => (
              <div
                className="gallery-row"
                style={{ maxWidth: row.max }}
                key={row.items.join("-")}
              >
                {row.items.map((index) => {
                  const image = p.images[index];
                  return (
                    <figure key={image.src} style={{ flexGrow: Math.round(ratios[index] * 1000) }}>
                      <button
                        className="gallery-zoom"
                        aria-label={`Enlarge ${p.title}: ${image.caption}`}
                        onClick={() => open_(index)}
                      >
                        <Image
                          src={image.src}
                          alt={`${p.title}: ${image.caption}`}
                          width={image.width ?? 1440}
                          height={image.height ?? 1000}
                          sizes="(min-width: 720px) 1100px, 100vw"
                        />
                      </button>
                    </figure>
                  );
                })}
              </div>
            ))}
          </div>
        ),
      )}
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={`${p.title} enlarged image`}
        onClose={() => {
          setOpen(false);
          setZoom(1);
          drag.current = null;
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            move(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            move(-1);
          }
          if (event.key === "+" || event.key === "=") {
            event.preventDefault();
            changeZoom(0.5);
          }
          if (event.key === "-") {
            event.preventDefault();
            changeZoom(-0.5);
          }
          if (event.key === "0") {
            event.preventDefault();
            setZoom(1);
          }
        }}
      >
        <div className="lightbox-toolbar">
          <a href={current.src} target="_blank" rel="noopener noreferrer">
            <Tx en="Open original ↗" bn="মূল ছবি ↗" />
          </a>
          <button
            autoFocus
            className="lightbox-close"
            onClick={() => dialog.current?.close()}
            aria-label="Close enlarged image"
          >
            <Tx en="Close ×" bn="বন্ধ ×" />
          </button>
        </div>
        <div
          ref={stage}
          className="lightbox-stage"
          data-zoomed={zoom > 1}
          onDoubleClick={() => setZoom((value) => (value === 1 ? 2 : 1))}
          onClick={(event) => {
            if (dragged.current) {
              dragged.current = false;
              return;
            }
            // Clicking the empty backdrop area around the picture closes the lightbox.
            const img = event.target instanceof HTMLImageElement ? event.target : null;
            if (img && img.naturalWidth) {
              const box = img.getBoundingClientRect();
              const scale = Math.min(box.width / img.naturalWidth, box.height / img.naturalHeight);
              const w = img.naturalWidth * scale;
              const h = img.naturalHeight * scale;
              const left = box.left + (box.width - w) / 2;
              const top = box.top + (box.height - h) / 2;
              if (
                event.clientX >= left &&
                event.clientX <= left + w &&
                event.clientY >= top &&
                event.clientY <= top + h
              )
                return;
            }
            dialog.current?.close();
          }}
          onTouchStart={(event) => {
            swipe.current =
              event.touches.length === 1 && zoom <= 1
                ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
                : null;
          }}
          onTouchEnd={(event) => {
            const start = swipe.current;
            swipe.current = null;
            if (!start || p.images.length < 2) return;
            const t = event.changedTouches[0];
            const dx = t.clientX - start.x;
            const dy = t.clientY - start.y;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
              dragged.current = true;
              move(dx < 0 ? 1 : -1);
            }
          }}
          onTouchCancel={() => {
            swipe.current = null;
          }}
          onPointerDown={(event) => {
            dragged.current = false;
            if (
              zoom <= 1 ||
              event.pointerType !== "mouse" ||
              event.button !== 0
            )
              return;
            drag.current = {
              x: event.clientX,
              y: event.clientY,
              left: event.currentTarget.scrollLeft,
              top: event.currentTarget.scrollTop,
            };
          }}
          onPointerMove={(event) => {
            if (!drag.current) return;
            if (Math.hypot(event.clientX - drag.current.x, event.clientY - drag.current.y) > 4) {
              dragged.current = true;
              event.currentTarget.setPointerCapture(event.pointerId);
            }
            event.currentTarget.scrollLeft =
              drag.current.left - (event.clientX - drag.current.x);
            event.currentTarget.scrollTop =
              drag.current.top - (event.clientY - drag.current.y);
          }}
          onPointerUp={(event) => {
            drag.current = null;
            if (event.currentTarget.hasPointerCapture(event.pointerId))
              event.currentTarget.releasePointerCapture(event.pointerId);
          }}
          onPointerLeave={() => {
            // Before capture starts, leaving the image cancels a pending drag.
            if (!dragged.current) drag.current = null;
          }}
          onLostPointerCapture={() => {
            drag.current = null;
          }}
          onPointerCancel={() => {
            drag.current = null;
          }}
        >
          <div
            className="lightbox-canvas"
            style={{ width: `${zoom * 100}%`, height: `${zoom * 100}%` }}
          >
            <img src={current.src} alt={current.caption} draggable={false} />
          </div>
        </div>
        <div className="lightbox-bottom">
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => move(-1)}
            disabled={p.images.length < 2}
          >
            ← <span><Tx en="Previous" bn="আগের" /></span>
          </button>
          <div className="zoom-controls" aria-label="Image zoom controls">
            <button
              type="button"
              aria-label="Zoom out"
              onClick={() => changeZoom(-0.5)}
              disabled={zoom <= 1}
            >
              −
            </button>
            <button
              type="button"
              aria-label="Reset zoom"
              title="Reset zoom"
              onClick={() => setZoom(1)}
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              type="button"
              aria-label="Zoom in"
              onClick={() => changeZoom(0.5)}
              disabled={zoom >= 8}
            >
              +
            </button>
          </div>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => move(1)}
            disabled={p.images.length < 2}
          >
            <span><Tx en="Next" bn="পরের" /></span> →
          </button>
        </div>
        <span className="sr-only" aria-live="polite">
          {current.caption}
        </span>
      </dialog>
    </>
  );
}
