import { PropertyCard } from "@/components/properties/PropertyCard";
import { mockProperties as allProperties } from "@/lib/mockData";

export function SimilarProperties() {
  const mockProperties = allProperties.filter(p => p.featured).slice(0, 3);

  return (
    <div className="mt-16 border-t border-gray-100 pt-16">
      <h3 className="text-2xl font-bold text-slate-900 mb-8 font-heading">
        Similar Properties You May Like
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockProperties.map(property => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </div>
  );
}
