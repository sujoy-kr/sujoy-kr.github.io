/**
 * Justified-row layout for galleries. Given image aspect ratios, picks row
 * breaks so every row ends up close to a target height; images in a row share
 * one height and together fill the row width. Pure and deterministic, so the
 * server and client agree.
 */
export type Row = {
  items: number[];
  /** Widest the row may be (px) so that very tall rows don't stretch endlessly. */
  max: number;
};

type Options = {
  width: number; // reference container width in px
  gap: number;
  target: number; // ideal height for rows of ordinary images
  tallTarget: number; // ideal height for rows made only of tall (page-length) images
  maxHeight: number;
  maxPerRow: number;
  /** Page-length captures are never drawn narrower than this (px, capped at the container width). */
  tallMinWidth?: number;
};

const TALL = 0.7;

export function layoutRows(ratios: number[], o: Options): Row[] {
  const n = ratios.length;
  const span = (a: number, b: number) => {
    let sum = 0;
    let tall = 0;
    for (let k = a; k < b; k++) {
      sum += ratios[k];
      if (ratios[k] < TALL) tall++;
    }
    return { sum, tall: tall === b - a, mixed: tall > 0 && tall < b - a };
  };
  const cost = (a: number, b: number) => {
    if (b - a > o.maxPerRow) return Infinity;
    const { sum, tall, mixed } = span(a, b);
    if (mixed) return Infinity; // page-length captures never share a row with wide ones
    const h = (o.width - o.gap * (b - a - 1)) / sum;
    return Math.log(Math.min(h, o.maxHeight) / (tall ? o.tallTarget : o.target)) ** 2;
  };
  const best = Array<number>(n + 1).fill(Infinity);
  const from = Array<number>(n + 1).fill(0);
  best[0] = 0;
  for (let j = 1; j <= n; j++)
    for (let i = Math.max(0, j - o.maxPerRow); i < j; i++) {
      const c = best[i] + cost(i, j) + 0.02; // slight preference for fewer rows
      if (c < best[j]) {
        best[j] = c;
        from[j] = i;
      }
    }
  const rows: Row[] = [];
  for (let j = n; j > 0; j = from[j]) {
    const i = from[j];
    const items = Array.from({ length: j - i }, (_, k) => i + k);
    rows.unshift({
      items,
      max: Math.round(
        Math.max(
          span(i, j).sum * o.maxHeight + o.gap * (items.length - 1),
          span(i, j).tall ? Math.min(o.width, o.tallMinWidth ?? 0) : 0,
        ),
      ),
    });
  }
  return rows;
}

/**
 * Masonry packing: each image goes to the currently shortest column, so
 * uncropped images of any shape interlock with no gaps, like puzzle pieces.
 * Deterministic, so the server and client agree.
 */
export function layoutColumns(ratios: number[], count: number): number[][] {
  const cols = Array.from({ length: count }, () => ({ h: 0, items: [] as number[] }));
  ratios.forEach((ratio, index) => {
    const col = cols.reduce((a, b) => (b.h < a.h - 1e-9 ? b : a));
    col.items.push(index);
    col.h += 1 / ratio;
  });
  return cols.map((c) => c.items);
}
