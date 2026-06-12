import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// PUT /api/admin/agents/[id]/verify - Toggle verify status
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { verified } = body;
    const { id } = await context.params;

    const updatedAgent = await prisma.user.update({
      where: { id: id },
      data: { verified },
      include: {
        agentProfile: true,
        _count: {
          select: { properties: true, inquiries: true }
        }
      }
    });

    return NextResponse.json({ success: true, agent: updatedAgent });
  } catch (error) {
    console.error("Failed to verify agent:", error);
    return NextResponse.json({ success: false, error: "Failed to update status" }, { status: 500 });
  }
}
