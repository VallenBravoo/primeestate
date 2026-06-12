import { ShieldCheck, TrendingUp, Search, Clock, Users, Building } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Listings",
    description: "Every property goes through a rigorous verification process to ensure authenticity and trust.",
  },
  {
    icon: TrendingUp,
    title: "Serious Leads",
    description: "We filter inquiries so agents and landlords only connect with high-intent buyers and renters.",
  },
  {
    icon: Search,
    title: "Easy Property Search",
    description: "Our advanced search and filters make finding your dream property fast and straightforward.",
  },
  {
    icon: Building,
    title: "Professional Display",
    description: "Properties are showcased with high-quality galleries, maps, and detailed features.",
  },
  {
    icon: Clock,
    title: "Fast Inquiry System",
    description: "Connect instantly via WhatsApp or our built-in lead management tools to close deals faster.",
  },
  {
    icon: Users,
    title: "Trusted by Agents",
    description: "Top real estate professionals and property management companies rely on our platform.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-gold-50 opacity-50 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-slate-50 opacity-50 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-heading">
            Why Choose PrimeEstate?
          </h2>
          <p className="text-slate-600 text-lg">
            We bridge the gap between property owners and seekers with a trustworthy, modern, and high-performance real estate platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-gold-200 transition-all duration-300 group"
            >
              <div className="h-14 w-14 rounded-xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-gold-50 transition-colors duration-300">
                <feature.icon className="h-7 w-7 text-slate-900 group-hover:text-gold-500 transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
