import { PropertyCard } from "@/components/properties/PropertyCard";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export default async function PropertiesPage(props: { searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = props.searchParams ? await props.searchParams : undefined;
  
  // Build where clause based on searchParams
  const whereClause: Prisma.PropertyWhereInput = { verified: true };
  if (searchParams?.purpose && searchParams.purpose !== "all") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    whereClause.purpose = (searchParams.purpose as string).toUpperCase() as any;
  }
  if (searchParams?.location && searchParams.location !== "all") {
    whereClause.location = { contains: searchParams.location as string };
  }
  if (searchParams?.type && searchParams.type !== "all") {
    whereClause.propertyType = { equals: searchParams.type as string };
  }
  if (searchParams?.minPrice) {
    whereClause.price = { ...((whereClause.price as Prisma.FloatFilter) || {}), gte: parseFloat(searchParams.minPrice as string) };
  }
  if (searchParams?.maxPrice) {
    whereClause.price = { ...((whereClause.price as Prisma.FloatFilter) || {}), lte: parseFloat(searchParams.maxPrice as string) };
  }
  if (searchParams?.keyword) {
    whereClause.OR = [
      { title: { contains: searchParams.keyword as string } },
      { description: { contains: searchParams.keyword as string } },
      { location: { contains: searchParams.keyword as string } }
    ];
  }
  if (searchParams?.bedrooms && searchParams.bedrooms !== "any") {
    whereClause.bedrooms = { gte: parseInt(searchParams.bedrooms as string) };
  }
  if (searchParams?.bathrooms && searchParams.bathrooms !== "any") {
    whereClause.bathrooms = { gte: parseInt(searchParams.bathrooms as string) };
  }

  const dbProperties = await prisma.property.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
    include: { images: true }
  });

  const filteredProperties = dbProperties.map(p => ({
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
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-heading">
            Properties for Sale & Rent
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl">
            Browse our extensive list of verified properties to find your next home, office, or investment opportunity.
          </p>
        </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="hidden lg:block lg:w-1/3 xl:w-1/4">
              <Suspense fallback={<div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm h-[400px] animate-pulse">Loading filters...</div>}>
                <PropertyFilters />
              </Suspense>
            </div>

          {/* Properties Grid */}
          <div className="w-full lg:w-2/3 xl:w-3/4">
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <span className="text-slate-600 font-medium">Showing {filteredProperties.length} properties</span>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-slate-700">Sort by:</label>
                <select aria-label="Sort properties" className="border-slate-200 rounded-md text-sm p-2 bg-slate-50 focus:ring-gold-500 focus:border-gold-500 outline-none">
                  <option>Newest First</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Featured First</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProperties.length > 0 ? filteredProperties.map(property => (
                <PropertyCard key={property.id} {...property} />
              )) : (
                <div className="col-span-full py-12 text-center">
                  <p className="text-slate-500 text-lg">No properties found matching your criteria.</p>
                </div>
              )}
            </div>

            {/* Pagination Placeholder */}
            <div className="mt-12 flex justify-center">
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-slate-200 rounded-md bg-white text-slate-500 hover:bg-slate-50">Previous</button>
                <button className="px-4 py-2 bg-slate-900 text-white rounded-md font-medium">1</button>
                <button className="px-4 py-2 border border-slate-200 rounded-md bg-white text-slate-700 hover:bg-slate-50">2</button>
                <button className="px-4 py-2 border border-slate-200 rounded-md bg-white text-slate-700 hover:bg-slate-50">3</button>
                <button className="px-4 py-2 border border-slate-200 rounded-md bg-white text-slate-700 hover:bg-slate-50">Next</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
