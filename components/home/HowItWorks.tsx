import { Search } from "lucide-react";

export function HowItWorks() {
  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-white">
            How It Works
          </h2>
          <p className="text-slate-300 text-lg">
            Whether you are looking for a new home or wanting to list a property, our process is designed to be seamless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* For Property Seekers */}
          <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700">
            <h3 className="text-2xl font-bold text-gold-500 mb-8 flex items-center gap-3 border-b border-slate-700 pb-4">
              <Search className="h-6 w-6" /> For Property Seekers
            </h3>
            <ul className="space-y-8">
              <li className="flex gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white">1</div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Search Property</h4>
                  <p className="text-slate-400">Use our advanced filters to find houses, apartments, or commercial spaces that match your exact criteria.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white">2</div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">View Details</h4>
                  <p className="text-slate-400">Explore high-quality galleries, floor plans, amenities, and accurate location maps for each property.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gold-500 text-slate-900 flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">Send Inquiry & Schedule</h4>
                  <p className="text-slate-400">Contact the agent directly via WhatsApp or our secure inquiry form to schedule a viewing immediately.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* For Property Owners */}
          <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700">
            <h3 className="text-2xl font-bold text-gold-500 mb-8 flex items-center gap-3 border-b border-slate-700 pb-4">
              <Building className="h-6 w-6" /> For Agents & Landlords
            </h3>
            <ul className="space-y-8">
              <li className="flex gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white">1</div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Submit Property</h4>
                  <p className="text-slate-400">Fill out our comprehensive listing form with property details, high-res photos, and pricing information.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white">2</div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Admin Verifies</h4>
                  <p className="text-slate-400">Our team reviews and verifies the property to ensure quality and build trust with potential buyers.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gold-500 text-slate-900 flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">Receive Serious Leads</h4>
                  <p className="text-slate-400">Your property goes live! Manage inquiries from a centralized dashboard and close deals faster.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// Need to import Building since it was used in the snippet
import { Building } from "lucide-react";
