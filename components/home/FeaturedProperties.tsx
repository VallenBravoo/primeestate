import { PropertyCard } from "@/components/properties/PropertyCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export async function FeaturedProperties() {
  const dbProperties = await prisma.property.findMany({
    where: { featured: true, verified: true },
    take: 6,
    orderBy: { createdAt: "desc" },
    include: { images: true }
  });

  const featured = dbProperties.map(p => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    location: p.location,
    price: p.price,
    status: p.status as "FOR_SALE" | "FOR_RENT" | "SOLD" | "RENTED" | "AVAILABLE",
    purpose: p.purpose as "SALE" | "RENT",
    bedrooms: p.bedrooms || 0,
    bathrooms: p.bathrooms || 0,
    parking: p.parking || 0,
    size: p.size || 0,
    imageUrl: p.images?.[0]?.imageUrl || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80",
    featured: p.featured,
  }));

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-heading">
              Featured Properties
            </h2>
            <p className="text-lg text-slate-600">
              Handpicked selection of our most exclusive and premium real estate listings available right now.
            </p>
          </div>
          <Link href="/properties" className="hidden sm:inline-flex items-center text-gold-600 font-semibold hover:text-gold-700 transition-colors group">
            View All Properties <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.length > 0 ? featured.map(property => (
            <PropertyCard key={property.id} {...property} />
          )) : (
            <div className="col-span-full py-12 text-center text-slate-500">
              No featured properties available right now.
            </div>
          )}
        </div>

        <div className="mt-10 sm:hidden">
          <Link href="/properties" className="inline-flex items-center text-gold-600 font-semibold hover:text-gold-700 transition-colors group">
            View All Properties <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
