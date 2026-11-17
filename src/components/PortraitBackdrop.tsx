import Image from "next/image";
import { PORTRAIT } from "@/lib/seo";

/**
 * Decorative portrait pinned to the top-right of its `.backdrop-host` parent.
 * CSS fades it into the page background at the bottom and on the text side.
 */
export function PortraitBackdrop() {
  return (
    <div className="portrait-backdrop" aria-hidden="true">
      <Image
        className="portrait-backdrop-img"
        src={PORTRAIT.src}
        width={PORTRAIT.width}
        height={PORTRAIT.height}
        alt=""
        priority
        sizes="100vw"
      />
    </div>
  );
}
