import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// DELETE /api/admin/agents/[id]
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete agent:", error);
    return NextResponse.json({ success: false, error: "Failed to delete agent" }, { status: 500 });
  }
}

// PUT /api/admin/agents/[id]
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await req.json();
    const { name, email, company, role, location, verified } = body;

    const updatedAgent = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        verified: !!verified,
        agentProfile: {
          upsert: {
            create: {
              companyName: company || null,
              specialization: role || null,
              location: location || null,
              email: email,
            },
            update: {
              companyName: company || null,
              specialization: role || null,
              location: location || null,
              email: email,
            }
          }
        }
      },
      include: {
        agentProfile: true,
        _count: {
          select: { properties: true, inquiries: true }
        }
      }
    });

    return NextResponse.json({ success: true, agent: updatedAgent });
  } catch (error) {
    console.error("Failed to update agent:", error);
    return NextResponse.json({ success: false, error: "Failed to update agent" }, { status: 500 });
  }
}
