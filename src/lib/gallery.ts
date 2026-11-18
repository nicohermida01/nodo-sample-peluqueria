import { getImage } from 'astro:assets';
import type { Service, Stylist, Work } from './services';
import { WORK_CATEGORY_LABELS } from './services';

export interface LightboxImage {
  src: string;
  srcset: string;
  width: number;
  height: number;
  alt: string;
}

export interface WorkView {
  work: Work;
  stylist?: Stylist;
  service?: Service;
  categoryLabel: string;
  large: LightboxImage;
  before?: LightboxImage;
}

const LARGE_WIDTHS = [640, 960, 1280, 1600];

async function large(src: Work['data']['image'], alt: string): Promise<LightboxImage> {
  const widths = LARGE_WIDTHS.filter((w) => w <= src.width);
  const img = await getImage({ src, widths: widths.length ? widths : [src.width], format: 'webp', quality: 78 });
  return {
    src: img.src,
    srcset: img.srcSet.attribute,
    width: src.width,
    height: src.height,
    alt,
  };
}

/** Resolves references and pre-renders the larger lightbox images at build time. */
export async function buildWorkViews(works: Work[], team: Stylist[], services: Service[]): Promise<WorkView[]> {
  return Promise.all(
    works.map(async (work) => {
      const d = work.data;
      return {
        work,
        stylist: team.find((t) => t.id === d.stylist.id),
        service: d.service ? services.find((s) => s.id === d.service!.id) : undefined,
        categoryLabel: WORK_CATEGORY_LABELS[d.category],
        large: await large(d.image, d.alt),
        before: d.before ? await large(d.before.image, d.before.alt) : undefined,
      };
    }),
  );
}
