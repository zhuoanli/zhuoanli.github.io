/**
 * The segmentation contours, turned into SVG path data.
 *
 * `scripts/build_hero_media.py` writes public/media/hero-contours.json: 28
 * frames of RV / myocardium / LV polygons in a 1000-unit box, traced by
 * MedSAM2 on ACDC patient 022. This module is the only reader.
 *
 * Everything here runs at build time — Astro renders to static HTML, so the
 * 29 KB of polygon data never reaches the browser. Only the handful of `d`
 * strings that actually get rendered do.
 */

import raw from '../../public/media/hero-contours.json';

export type Label = 'rv' | 'myo' | 'lv';

type Ring = [number, number][];
type Frame = Record<Label, Ring[]>;

const data = raw as unknown as {
  viewBox: number;
  cell: number;
  cols: number;
  rows: number;
  frames: number;
  frameMs: number;
  edIdx: number;
  esIdx: number;
  labels: Label[];
  source: string;
  group: string;
  model: string;
  contours: Frame[];
};

/** Geometry and provenance of the cine loop, for anything that renders it. */
export const cine = {
  viewBox: data.viewBox,
  cols: data.cols,
  rows: data.rows,
  frames: data.frames,
  frameMs: data.frameMs,
  /** End-diastole: the fullest frame, and the right one to hold on a still. */
  edIdx: data.edIdx,
  /** End-systole: the tightest frame. */
  esIdx: data.esIdx,
  labels: data.labels,
  source: data.source,
  group: data.group,
  model: data.model,
  sprite: '/media/hero-cine.webp',
  poster: '/media/hero-poster.webp',
} as const;

export const LABEL_TEXT: Record<Label, string> = {
  rv: 'Right ventricle',
  myo: 'Myocardium',
  lv: 'Left ventricle',
};

/** Rings are closed polygons, so every subpath ends in Z. */
export function pathFor(label: Label, frame = cine.edIdx): string {
  const f = data.contours[((frame % cine.frames) + cine.frames) % cine.frames];
  const rings = f?.[label] ?? [];
  return rings
    .map((ring) => `M${ring.map(([x, y]) => `${x} ${y}`).join('L')}Z`)
    .join('');
}

export function pathsFor(frame = cine.edIdx, labels: readonly Label[] = data.labels) {
  return labels.map((label) => ({ label, d: pathFor(label, frame) }));
}

/**
 * Tight box around the contours across *every* frame.
 *
 * The source box is 1000x1000 — the whole MRI slice — but the heart occupies
 * only the middle of it, so drawing at the full viewBox leaves the outline
 * floating small inside a lot of empty space. Taking the union over all frames
 * rather than per-frame means the mark keeps its position and scale while the
 * cycle plays instead of jittering.
 */
function unionBox() {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const frame of data.contours) {
    for (const label of data.labels) {
      for (const ring of frame[label] ?? []) {
        for (const [x, y] of ring) {
          if (x < minX) minX = x;
          if (y < minY) minY = y;
          if (x > maxX) maxX = x;
          if (y > maxY) maxY = y;
        }
      }
    }
  }

  // Pad so thick strokes are not clipped at the edges of the box.
  const pad = Math.max(maxX - minX, maxY - minY) * 0.06;
  const x = minX - pad;
  const y = minY - pad;
  return {
    x: Math.round(x),
    y: Math.round(y),
    w: Math.round(maxX + pad - x),
    h: Math.round(maxY + pad - y),
  };
}

export const contourBox = unionBox();
