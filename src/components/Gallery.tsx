"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";

export function Gallery({ project: p }: { project: Project }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const previousZoom = useRef(1);
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

  useEffect(() => {
    if (!open) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
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
      <div
        className={`gallery ${p.images.every((image) => (image.height ?? 0) / (image.width ?? 1) > 1.15) ? "gallery-portraits" : ""}`}
      >
        {p.images.map((image, index) => (
          <figure
            key={image.src}
            className={
              (image.height ?? 0) / (image.width ?? 1) > 2.4
                ? "gallery-long"
                : (image.height ?? 0) / (image.width ?? 1) > 1.15
                  ? "gallery-portrait"
                  : ""
            }
          >
            <button
              className="gallery-zoom"
              aria-label={`Enlarge ${p.title}: ${image.caption}`}
              onClick={() => {
                setSelected(index);
                setZoom(1);
                setOpen(true);
                dialog.current?.showModal();
              }}
            >
              <Image
                src={image.src}
                alt={`${p.title}: ${image.caption}`}
                width={image.width ?? 1440}
                height={image.height ?? 1000}
              />
            </button>
          </figure>
        ))}
      </div>
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
            Open original ↗
          </a>
          <button
            autoFocus
            className="lightbox-close"
            onClick={() => dialog.current?.close()}
            aria-label="Close enlarged image"
          >
            Close ×
          </button>
        </div>
        <div
          ref={stage}
          className="lightbox-stage"
          data-zoomed={zoom > 1}
          onDoubleClick={() => setZoom((value) => (value === 1 ? 2 : 1))}
          onPointerDown={(event) => {
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
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (!drag.current) return;
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
            ← <span>Previous</span>
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
            <span>Next</span> →
          </button>
        </div>
        <span className="sr-only" aria-live="polite">
          {current.caption}
        </span>
      </dialog>
    </>
  );
}
