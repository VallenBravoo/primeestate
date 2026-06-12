import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Since this is a public form in our current setup without auth enforcement for submitting,
    // we assume we need to link it to a user. We'll find or create a placeholder user for the ownerEmail.
    let user = await prisma.user.findUnique({
      where: { email: data.ownerEmail },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: data.ownerName,
          email: data.ownerEmail,
          role: "CUSTOMER",
        },
      });
    }

    // Generate a basic slug
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();

    const locationParts = data.location.split(",");
    const city = locationParts[locationParts.length - 1]?.trim() || "Dar es Salaam";

    const property = await prisma.property.create({
      data: {
        title: data.title,
        slug,
        description: data.description,
        location: data.location,
        city,
        price: parseFloat(data.price),
        purpose: data.purpose,
        propertyType: data.propertyType,
        bedrooms: data.bedrooms ? parseInt(data.bedrooms) : null,
        bathrooms: data.bathrooms ? parseInt(data.bathrooms) : null,
        size: data.size ? parseFloat(data.size) : null,
        amenities: data.amenities || "",
        status: "AVAILABLE",
        verified: true, // Auto-verified since admin approval is no longer required
        agentId: user.id,
      },
    });

    return NextResponse.json({ success: true, property }, { status: 201 });
  } catch (error) {
    console.error("Failed to create property:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit") as string) : 10;
    const featured = searchParams.get("featured") === "true";

    const whereClause: Prisma.PropertyWhereInput = {
      verified: true,
    };

    if (featured) {
      whereClause.featured = true;
    }

    const properties = await prisma.property.findMany({
      where: whereClause,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json({ success: true, properties }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
