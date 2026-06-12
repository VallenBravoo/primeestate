import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// GET /api/admin/agents - Fetch all agents
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const agents = await prisma.user.findMany({
      where: { role: "AGENT" },
      include: {
        agentProfile: true,
        _count: {
          select: { properties: true, inquiries: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ success: true, agents });
  } catch (error) {
    console.error("Failed to fetch agents:", error);
    return NextResponse.json({ success: false, error: "Failed to load agents" }, { status: 500 });
  }
}

// POST /api/admin/agents - Create a new agent
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, email, company, role, location, verified } = body;

    if (!name || !email) {
      return NextResponse.json({ success: false, error: "Name and Email are required" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ success: false, error: "User with this email already exists" }, { status: 409 });
    }

    // Hash default password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("agent123", salt);

    // Create user
    const newAgent = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "AGENT",
        verified: !!verified,
        agentProfile: {
          create: {
            companyName: company || null,
            specialization: role || null,
            location: location || null,
            email: email,
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

    return NextResponse.json({ success: true, agent: newAgent }, { status: 201 });
  } catch (error) {
    console.error("Failed to create agent:", error);
    return NextResponse.json({ success: false, error: "Failed to create agent" }, { status: 500 });
  }
}
