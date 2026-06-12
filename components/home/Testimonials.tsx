import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "John Doe",
    role: "Real Estate Agent",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    content: "PrimeEstate has completely transformed how I generate leads. The professional layout and verification system bring in serious buyers instead of time-wasters. My closing rate has doubled since I started listing here.",
  },
  {
    name: "Sarah Jane",
    role: "Property Investor",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    content: "As someone who buys and rents out properties, I needed a reliable platform. The WhatsApp integration makes it incredibly easy to communicate with potential tenants instantly. Highly recommended!",
  },
  {
    name: "Michael Smith",
    role: "First-time Buyer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    content: "I was struggling to find a legitimate house in Dar es Salaam until I found PrimeEstate. The property details were accurate, the gallery was beautiful, and the agent was verified. I found my dream home in weeks.",
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-heading">
            Trusted by Professionals & Clients
          </h2>
          <p className="text-slate-600 text-lg">
            Don&apos;t just take our word for it. Here is what agents, landlords, and buyers have to say about PrimeEstate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative">
              <Quote className="absolute top-6 right-8 h-10 w-10 text-gold-100" />
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gold-500 text-gold-500" />
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed mb-8 relative z-10 italic">
                &quot;{testimonial.content}&quot;
              </p>
              <div className="flex items-center gap-4">
                <Image 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  width={56} 
                  height={56} 
                  className="rounded-full ring-2 ring-gold-100"
                />
                <div>
                  <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                  <p className="text-sm text-gold-600 font-medium">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
