import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password, company, role, location } = await req.json();

    if (!firstName || !lastName || !email || !password || !company || !role || !location) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with AGENT role and link an AgentProfile
    const newUser = await prisma.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        email,
        password: hashedPassword,
        role: "AGENT", // Automatically assign AGENT role for this endpoint
        agentProfile: {
          create: {
            companyName: company,
            specialization: role,
            location: location,
            email: email, // Set the profile email to match user email by default
          }
        }
      },
    });

    return NextResponse.json(
      { message: "Agent registered successfully", user: { id: newUser.id, email: newUser.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "An error occurred during registration: " + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}
