import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, message, propertyId } = data;

    // Verify property exists in the database to get the agentId
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      select: { agentId: true }
    });

    if (!property) {
      return NextResponse.json({ success: false, error: "Property not found in database." }, { status: 404 });
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        phone,
        message,
        propertyId,
        assignedAgentId: property.agentId, // Automatically assign to the agent who listed it
      }
    });

    return NextResponse.json({ success: true, inquiry }, { status: 201 });
  } catch (error) {
    console.error("Failed to create inquiry:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
