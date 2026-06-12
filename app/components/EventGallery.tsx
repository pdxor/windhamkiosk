import Image from "next/image";
import type { EventGalleryItem } from "@/app/lib/events";

type EventGalleryProps = {
  items: EventGalleryItem[];
};

export function EventGallery({ items }: EventGalleryProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.id}
          className="overflow-hidden rounded-[var(--radius)] border border-[var(--stone)] bg-white shadow-sm"
        >
          <div className="relative aspect-[4/3] bg-[var(--sage)]">
            <Image
              src={item.imageSrc}
              alt={item.imageAlt}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="p-5">
            <h3 className="brand-heading text-xl font-bold text-[var(--earth-brown)]">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--charcoal)]">
              {item.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
