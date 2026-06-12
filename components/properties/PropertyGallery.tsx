"use client";

import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface PropertyGalleryProps {
  images: { id: string; url: string; title?: string }[];
}

export function PropertyGallery({ images }: PropertyGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0]?.url);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Main Large Image */}
      <Dialog>
        <DialogTrigger render={
          <button type="button" aria-label="View enlarged image" className="relative block text-left aspect-video w-full cursor-zoom-in rounded-2xl overflow-hidden shadow-sm group">
            <Image
              src={activeImage}
              alt="Main property view"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
          </button>
        } />
        <DialogContent className="max-w-5xl bg-transparent border-none shadow-none p-0">
          <div className="relative aspect-video w-full rounded-lg overflow-hidden">
            <Image
              src={activeImage}
              alt="Enlarged property view"
              fill
              className="object-contain bg-slate-900/90 backdrop-blur-sm"
              unoptimized
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 sm:gap-4">
        {images.map((image) => (
          <button
            key={image.id}
            aria-label={`View thumbnail ${image.title || image.id}`}
            onClick={() => setActiveImage(image.url)}
            className={cn(
              "relative aspect-square w-full rounded-xl overflow-hidden shadow-sm border-2 transition-all",
              activeImage === image.url ? "border-gold-500 opacity-100" : "border-transparent opacity-70 hover:opacity-100"
            )}
          >
            <Image
              src={image.url}
              alt={image.title || "Thumbnail"}
              fill
              className="object-cover"
              unoptimized
            />
          </button>
        ))}
      </div>
    </div>
  );
}
