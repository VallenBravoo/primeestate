import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Car, Square, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface PropertyCardProps {
  id: string;
  slug: string;
  title: string;
  location: string;
  price: number;
  currency?: string;
  status: "FOR_SALE" | "FOR_RENT" | "SOLD" | "RENTED" | "AVAILABLE";
  purpose: "SALE" | "RENT";
  bedrooms: number;
  bathrooms: number;
  parking: number;
  size: number;
  imageUrl: string;
  featured?: boolean;
}

const statusColors = {
  FOR_SALE: "bg-blue-600 hover:bg-blue-700",
  FOR_RENT: "bg-emerald-600 hover:bg-emerald-700",
  SOLD: "bg-red-600 hover:bg-red-700",
  RENTED: "bg-red-600 hover:bg-red-700",
  AVAILABLE: "bg-emerald-600 hover:bg-emerald-700",
};

const statusLabels = {
  FOR_SALE: "For Sale",
  FOR_RENT: "For Rent",
  SOLD: "Sold",
  RENTED: "Rented",
  AVAILABLE: "Available",
};

export function PropertyCard({
  slug,
  title,
  location,
  price,
  currency = "TZS",
  status,
  purpose,
  bedrooms,
  bathrooms,
  parking,
  size,
  imageUrl,
  featured = false,
}: PropertyCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-US").format(price);

  return (
    <div className="group rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <Badge className={cn("text-white px-3 py-1 text-xs font-semibold uppercase tracking-wider", statusColors[status] || "bg-slate-900")}>
            {statusLabels[status] || status}
          </Badge>
        </div>
        {featured && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-gold-500 hover:bg-gold-600 text-slate-900 font-bold px-3 py-1">
              Featured
            </Badge>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent p-4">
          <p className="text-white font-bold text-2xl">
            {currency} {formattedPrice}
            {purpose === "RENT" && <span className="text-sm font-normal text-slate-200"> / month</span>}
          </p>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-4 flex-grow">
          <h3 className="font-bold text-xl text-slate-900 line-clamp-1 mb-2 group-hover:text-gold-600 transition-colors">
            <Link href={`/properties/${slug}`}>{title}</Link>
          </h3>
          <p className="flex items-center text-slate-500 text-sm">
            <MapPin className="h-4 w-4 mr-1 shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-4 gap-2 py-4 border-t border-b border-gray-100 mb-4">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Bed className="h-4 w-4 text-slate-400" />
            <span className="font-medium text-sm">{bedrooms}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <Bath className="h-4 w-4 text-slate-400" />
            <span className="font-medium text-sm">{bathrooms}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <Car className="h-4 w-4 text-slate-400" />
            <span className="font-medium text-sm">{parking}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <Square className="h-4 w-4 text-slate-400" />
            <span className="font-medium text-xs">{size} m²</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-auto">
          <Link
            href={`/properties/${slug}`}
            className={cn(buttonVariants({ variant: "outline" }), "flex-1 border-slate-200 hover:border-slate-300 text-slate-700")}
          >
            View Details
          </Link>
          <Link
            href={`/properties/${slug}#inquiry`}
            className={cn(buttonVariants({ variant: "default" }), "flex-1 bg-slate-900 hover:bg-slate-800 text-white")}
          >
            Inquire
          </Link>
        </div>
      </div>
    </div>
  );
}
