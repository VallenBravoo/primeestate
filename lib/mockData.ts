export const mockAgents = [
  {
    id: "a1",
    name: "John Doe",
    company: "Prime Real Estate",
    role: "Senior Property Consultant",
    bio: "With over 10 years of experience in the Dar es Salaam real estate market, John is dedicated to providing exceptional service. Whether you are buying your first home or looking to expand your investment portfolio, John's extensive market knowledge and negotiation skills ensure you get the best deal possible.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=500&h=500&q=80",
    rating: 4.9,
    reviews: 124,
    propertiesCount: 45,
    location: "Dar es Salaam",
    experience: "10 Years",
    phone: "+255 123 456 789",
    email: "john@primeestate.com",
    verified: true,
  },
  {
    id: "a2",
    name: "Sarah Jane",
    company: "Zanzibar Properties Ltd",
    role: "Luxury Property Specialist",
    bio: "Sarah specializes in high-end beachfront properties and luxury apartments across Zanzibar. Her keen eye for detail and uncompromising standards make her the go-to agent for premium real estate.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=500&h=500&q=80",
    rating: 5.0,
    reviews: 89,
    propertiesCount: 22,
    location: "Zanzibar",
    experience: "8 Years",
    phone: "+255 123 456 790",
    email: "sarah@zanzibarproperties.com",
    verified: true,
  },
  {
    id: "a3",
    name: "Michael Smith",
    company: "Arusha Homes",
    role: "Commercial Real Estate Broker",
    bio: "Focusing on commercial spaces and large-scale agricultural land, Michael has facilitated some of the biggest real estate transactions in Arusha. His network of corporate clients is unmatched.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=500&h=500&q=80",
    rating: 4.7,
    reviews: 56,
    propertiesCount: 18,
    location: "Arusha",
    experience: "15 Years",
    phone: "+255 123 456 791",
    email: "michael@arushahomes.com",
    verified: true,
  },
  {
    id: "a4",
    name: "Emily Chen",
    company: "City Living Estates",
    role: "Residential Agent",
    bio: "Emily is passionate about helping young families find their starter homes. Known for her patience and step-by-step guidance, she makes the daunting process of buying a home simple and exciting.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=500&h=500&q=80",
    rating: 4.8,
    reviews: 112,
    propertiesCount: 34,
    location: "Dar es Salaam",
    experience: "5 Years",
    phone: "+255 123 456 792",
    email: "emily@cityliving.com",
    verified: false,
  },
  {
    id: "1",
    name: "John Doe",
    company: "Prime Real Estate",
    role: "Senior Property Consultant",
    bio: "With over 10 years of experience in the Dar es Salaam real estate market, John is dedicated to providing exceptional service. Whether you are buying your first home or looking to expand your investment portfolio, John's extensive market knowledge and negotiation skills ensure you get the best deal possible.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=500&h=500&q=80",
    rating: 4.9,
    reviews: 124,
    propertiesCount: 45,
    location: "Dar es Salaam",
    experience: "10 Years",
    phone: "+255 123 456 789",
    email: "john@primeestate.com",
    verified: true,
  }
];

export const mockProperties = [
  {
    id: "1",
    slug: "modern-4-bedroom-house-mbezi-beach",
    title: "Modern 4 Bedroom House in Mbezi Beach",
    location: "Mbezi Beach, Dar es Salaam",
    price: 350000000,
    status: "FOR_SALE" as const,
    purpose: "SALE" as const,
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    size: 450,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80",
    featured: true,
  },
  {
    id: "2",
    slug: "luxury-apartment-masaki",
    title: "Luxury Apartment in Masaki",
    location: "Masaki, Dar es Salaam",
    price: 4500000,
    status: "FOR_RENT" as const,
    purpose: "RENT" as const,
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    size: 200,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: "3",
    slug: "commercial-office-space-posta",
    title: "Commercial Office Space in Posta",
    location: "Posta, Dar es Salaam",
    price: 12000000,
    status: "AVAILABLE" as const,
    purpose: "RENT" as const,
    bedrooms: 0,
    bathrooms: 2,
    parking: 5,
    size: 350,
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
    featured: true,
  },
  {
    id: "4",
    slug: "beachfront-villa-zanzibar",
    title: "Beachfront Villa",
    location: "Nungwi, Zanzibar",
    price: 850000000,
    status: "FOR_SALE" as const,
    purpose: "SALE" as const,
    bedrooms: 5,
    bathrooms: 5,
    parking: 4,
    size: 600,
    imageUrl: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: "5",
    slug: "cozy-studio-apartment",
    title: "Cozy Studio Apartment",
    location: "Sinza, Dar es Salaam",
    price: 800000,
    status: "FOR_RENT" as const,
    purpose: "RENT" as const,
    bedrooms: 1,
    bathrooms: 1,
    parking: 1,
    size: 45,
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: "6",
    slug: "prime-commercial-plot",
    title: "Prime Commercial Plot",
    location: "Kigamboni, Dar es Salaam",
    price: 150000000,
    status: "FOR_SALE" as const,
    purpose: "SALE" as const,
    bedrooms: 0,
    bathrooms: 0,
    parking: 0,
    size: 1200,
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    featured: true,
  },
  {
    id: "7",
    slug: "elegant-townhouse-mikocheni",
    title: "Elegant Townhouse in Mikocheni",
    location: "Mikocheni, Dar es Salaam",
    price: 2500000,
    status: "FOR_RENT" as const,
    purpose: "RENT" as const,
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    size: 180,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: "8",
    slug: "spacious-warehouse-nyerere-road",
    title: "Spacious Warehouse",
    location: "Nyerere Road, Dar es Salaam",
    price: 500000000,
    status: "FOR_SALE" as const,
    purpose: "SALE" as const,
    bedrooms: 0,
    bathrooms: 2,
    parking: 10,
    size: 850,
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8ed745d44b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: "9",
    slug: "ocean-view-penthouse",
    title: "Ocean View Penthouse",
    location: "Upanga, Dar es Salaam",
    price: 9500000,
    status: "FOR_RENT" as const,
    purpose: "RENT" as const,
    bedrooms: 4,
    bathrooms: 4,
    parking: 3,
    size: 320,
    imageUrl: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    featured: true,
  },
  {
    id: "10",
    slug: "family-home-goba",
    title: "Beautiful Family Home",
    location: "Goba, Dar es Salaam",
    price: 180000000,
    status: "FOR_SALE" as const,
    purpose: "SALE" as const,
    bedrooms: 4,
    bathrooms: 3,
    parking: 3,
    size: 350,
    imageUrl: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: "11",
    slug: "modern-office-suite",
    title: "Modern Office Suite",
    location: "Makumbusho, Dar es Salaam",
    price: 3500000,
    status: "AVAILABLE" as const,
    purpose: "RENT" as const,
    bedrooms: 0,
    bathrooms: 1,
    parking: 2,
    size: 150,
    imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: "12",
    slug: "farm-land-kigamboni",
    title: "Agricultural Farm Land",
    location: "Kigamboni, Dar es Salaam",
    price: 75000000,
    status: "FOR_SALE" as const,
    purpose: "SALE" as const,
    bedrooms: 0,
    bathrooms: 0,
    parking: 0,
    size: 5000,
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  }
];

export function filterProperties(properties: typeof mockProperties, searchParams: { [key: string]: string | string[] | undefined } | undefined) {
  if (!searchParams) return properties;

  return properties.filter(p => {
    const keyword = typeof searchParams.keyword === 'string' ? searchParams.keyword.toLowerCase() : '';
    const location = typeof searchParams.location === 'string' ? searchParams.location.toLowerCase() : '';
    const type = typeof searchParams.type === 'string' ? searchParams.type.toLowerCase() : '';
    const purpose = typeof searchParams.purpose === 'string' ? searchParams.purpose.toLowerCase() : '';
    const minPrice = typeof searchParams.minPrice === 'string' ? parseInt(searchParams.minPrice) : 0;
    const maxPrice = typeof searchParams.maxPrice === 'string' ? parseInt(searchParams.maxPrice) : 0;
    const bedrooms = typeof searchParams.bedrooms === 'string' ? parseInt(searchParams.bedrooms) : 0;
    const bathrooms = typeof searchParams.bathrooms === 'string' ? parseInt(searchParams.bathrooms) : 0;

    if (keyword && !p.title.toLowerCase().includes(keyword) && !p.location.toLowerCase().includes(keyword)) return false;
    if (location && location !== 'all' && !p.location.toLowerCase().includes(location)) return false;
    
    if (type && type !== 'all') {
      const pType = p.title.toLowerCase().includes('apartment') ? 'apartment' : 
                    p.title.toLowerCase().includes('house') || p.title.toLowerCase().includes('villa') || p.title.toLowerCase().includes('home') || p.title.toLowerCase().includes('townhouse') ? 'house' : 
                    p.title.toLowerCase().includes('commercial') || p.title.toLowerCase().includes('office') || p.title.toLowerCase().includes('warehouse') ? 'commercial' : 
                    p.title.toLowerCase().includes('land') || p.title.toLowerCase().includes('plot') || p.title.toLowerCase().includes('farm') ? 'land' : '';
      if (pType !== type) return false;
    }

    if (purpose && purpose !== 'all' && p.purpose.toLowerCase() !== purpose) return false;
    if (minPrice && p.price < minPrice) return false;
    if (maxPrice && p.price > maxPrice) return false;
    if (bedrooms && p.bedrooms < bedrooms) return false;
    if (bathrooms && p.bathrooms < bathrooms) return false;

    return true;
  });
}
