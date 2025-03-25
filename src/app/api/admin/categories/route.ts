import { db } from "@/lib/db";
import { Category } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export interface CategoryPostRequest {
  name: string;
}

export async function GET() {
  try {
    const categories: Category[] = await db.category.findMany({
      orderBy: { created_at: "desc" },
    });
    return NextResponse.json(categories, { status: 200 });
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
