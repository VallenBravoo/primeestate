import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { status } = data;

    if (!["SOLD", "RENTED", "AVAILABLE", "FOR_RENT", "FOR_SALE"].includes(status)) {
      return NextResponse.json({ success: false, error: "Invalid status" }, { status: 400 });
    }

    // Await params for Next 15+
    const resolvedParams = await params;

    const property = await prisma.property.findUnique({
      where: { id: resolvedParams.id },
    });

    if (!property) {
      return NextResponse.json({ success: false, error: "Property not found" }, { status: 404 });
    }

    // Only allow the owner or admin to change status
    if (property.agentId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const updatedProperty = await prisma.property.update({
      where: { id: resolvedParams.id },
      data: { status },
    });

    return NextResponse.json({ success: true, property: updatedProperty }, { status: 200 });
  } catch (error) {
    console.error("Failed to update property status:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
