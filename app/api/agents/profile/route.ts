import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { agentProfile: true },
    });

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Profile GET error:", error);
    return NextResponse.json({ success: false, error: "Failed to load profile" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, phone, profileImage, bio, companyName, specialization, location, whatsapp } = body;

    // Update user base record
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: name ?? undefined,
        phone: phone ?? undefined,
        profileImage: profileImage ?? undefined,
      },
    });

    // Upsert agent profile
    await prisma.agentProfile.upsert({
      where: { userId: session.user.id },
      update: {
        bio: bio ?? undefined,
        companyName: companyName ?? undefined,
        specialization: specialization ?? undefined,
        location: location ?? undefined,
        whatsapp: whatsapp ?? undefined,
        profileImage: profileImage ?? undefined,
      },
      create: {
        userId: session.user.id,
        bio,
        companyName,
        specialization,
        location,
        whatsapp,
        profileImage,
      },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Profile PUT error:", error);
    return NextResponse.json({ success: false, error: "Failed to update profile" }, { status: 500 });
  }
}
