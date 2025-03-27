import { db } from "@/lib/db";
import { Category } from "@/types";
import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export interface CategoryPostRequest {
  name: string;
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization") ?? "";
    const { error } = await supabase.auth.getUser(token);
    if (error)
      return NextResponse.json({ status: error.message }, { status: 400 });
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
    const token = request.headers.get("Authorization") ?? "";
    const { error } = await supabase.auth.getUser(token);
    if (error)
      return NextResponse.json({ status: error.message }, { status: 400 });
    const { name }: CategoryPostRequest = await request.json();
    const result = await db.category.create({
      data: { name },
    });
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
}
