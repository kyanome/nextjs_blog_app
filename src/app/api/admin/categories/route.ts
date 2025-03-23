import { db } from "@/app/(main)/_lib/db";
import { NextRequest, NextResponse } from "next/server";

interface CategoryPostRequest {
  name: string;
}

export async function GET() {
  try {
    const categories = await db.category.findMany({
      orderBy: { created_at: "desc" },
    });
    return NextResponse.json({ status: 200, data: categories });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name }: CategoryPostRequest = await request.json();
    const result = await db.category.create({
      data: { name },
    });
    return NextResponse.json({
      status: "OK",
      message: "作成しました",
      id: result.id,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
}
