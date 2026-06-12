import { Home, Building2, Map, Briefcase, Store, Warehouse } from "lucide-react";
import Link from "next/link";

const categories = [
  { name: "Houses", icon: Home, count: 120, href: "/properties?type=house" },
  { name: "Apartments", icon: Building2, count: 85, href: "/properties?type=apartment" },
  { name: "Land & Plots", icon: Map, count: 40, href: "/properties?type=land" },
  { name: "Offices", icon: Briefcase, count: 25, href: "/properties?type=office" },
  { name: "Shops", icon: Store, count: 18, href: "/properties?type=shop" },
  { name: "Warehouses", icon: Warehouse, count: 10, href: "/properties?type=warehouse" },
];

export function PropertyCategories() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-heading">
            Explore Property Types
          </h2>
          <p className="text-slate-600 text-lg">
            Find the perfect property from our extensive collection of real estate categories designed to meet your needs.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {categories.map((category) => (
            <Link 
              key={category.name} 
              href={category.href}
              className="group flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-gray-100 hover:border-gold-500 hover:shadow-lg transition-all duration-300"
            >
              <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                <category.icon className="h-8 w-8 text-gold-500" />
              </div>
              <h3 className="font-semibold text-slate-900 text-center mb-1 group-hover:text-gold-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-slate-500">
                {category.count} Properties
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
