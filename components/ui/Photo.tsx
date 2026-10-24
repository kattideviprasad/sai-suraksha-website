import Image from "next/image";
import clinicHall from "@/assets/images/clinic-hall.webp";
import consultationRoom from "@/assets/images/consultation-room.webp";
import treatmentCubicles from "@/assets/images/treatment-cubicles.webp";
import waitingArea from "@/assets/images/waiting-area.webp";
import logo from "@/assets/images/logo.webp";

const SRC = { clinicHall, consultationRoom, treatmentCubicles, waitingArea, logo } as const;

export type PhotoName = keyof typeof SRC;

/**
 * Clinic photo / logo via next/image (responsive WebP/AVIF, lazy by default).
 * `className` carries the design's width, aspect ratio and radius; `sizes` must match the layout.
 * `priority` marks the above-the-fold image: loaded eagerly at high priority.
 */
export function Photo({
  name,
  alt,
  className = "",
  sizes,
  priority = false,
}: {
  name: PhotoName;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={SRC[name]}
      alt={alt}
      sizes={sizes}
      className={className}
      quality={80}
      placeholder={name === "logo" ? "empty" : "blur"}
      {...(priority ? { loading: "eager" as const, fetchPriority: "high" as const } : {})}
    />
  );
}
