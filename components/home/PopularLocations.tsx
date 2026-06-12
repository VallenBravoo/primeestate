import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const locations = [
  { name: "Dar es Salaam", count: 450, image: "https://images.unsplash.com/photo-1546554137-f86b9593a222?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { name: "Zanzibar", count: 120, image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { name: "Arusha", count: 85, image: "https://images.unsplash.com/photo-1516483638261-f4085eeea49f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { name: "Mwanza", count: 65, image: "https://images.unsplash.com/photo-1518133501726-281bbaae156c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
];

export function PopularLocations() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-heading">
              Popular Locations
            </h2>
            <p className="text-slate-600 text-lg">
              Discover prime properties in the most sought-after cities and neighborhoods.
            </p>
          </div>
          <Link href="/properties" className="flex items-center text-gold-600 font-semibold hover:text-gold-700 transition-colors group">
            Explore All Areas <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((location) => (
            <Link 
              key={location.name} 
              href={`/properties?location=${location.name.toLowerCase()}`}
              className="group relative h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <Image 
                src={location.image}
                alt={location.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-2xl font-bold text-white mb-1">{location.name}</h3>
                <p className="text-gold-300 font-medium">{location.count} Properties</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
