import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const { username, password, email } = await request.json();
    console.log(username, password, email);

    // Hash the password
    const hashedPass = await bcrypt.hash(password, 10);

    // Create user and cart in a transaction
    const { id: userId } = await prisma.$transaction(async (prisma) => {
      // Create the user
      const user = await prisma.user.create({
        data: {
          email,
          username,
          password: hashedPass,
          role: "user",
        },
      });

      // Create a cart for the user
      await prisma.cart.create({
        data: {
          userId: user.id,
        },
      });

      return user; // Return the user object
    });

    console.log('User and cart created:', userId);

    return NextResponse.json({ message: "success" });
  } catch (e: any) {
    console.error("Error parsing request body:", e);
    return NextResponse.json({ message: "error", error: e.message }, { status: 400 });
  }
}
