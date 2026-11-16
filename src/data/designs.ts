import data from "./designs.json";

export type DesignImage = {
  src: string;
  caption: string;
  width: number;
  height: number;
};
export type Design = {
  slug: string;
  title: string;
  category: string;
  description: string;
  thumbnail: { src: string; width: number; height: number };
  images: DesignImage[];
};

export const designs: Design[] = data.map((design) => ({
  ...design,
  images: design.images.map((image, i) => ({
    ...image,
    caption: `Design view ${i + 1}`,
  })),
}));
