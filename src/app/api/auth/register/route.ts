import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { signIn } from "next-auth/react";

export async function POST(request: NextRequest) {
  try {
    const { username, password,email } = await request.json();
    console.log(username, password,email);
    const hashedPass  = await bcrypt.hash(password,10)

    const data = await prisma.user.create({
        data:{
            email,
            username,
            password:hashedPass
        }
    })
    console.log(data)
   

    return NextResponse.json({ message: "success" });
  } catch (e:any) {
    console.error("Error parsing request body:", e);
    return NextResponse.json({ message: "error", error: e.message }, { status: 400 });
  }
}