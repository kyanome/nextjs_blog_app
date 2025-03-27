import { db } from "@/lib/db";
import { Category } from "@/types";
import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export interface CategoryUpdateRequest {
  name: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = request.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);
  if (error)
    return NextResponse.json({ status: error.message }, { status: 400 });
  const { id } = await params;
  try {
    const category: Category | null = await db.category.findUnique({
      where: { id: parseInt(id) },
    });
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    const token = request.headers.get("Authorization") ?? "";
    const { error } = await supabase.auth.getUser(token);
    if (error)
      return NextResponse.json({ status: error.message }, { status: 400 });
    const { name }: CategoryUpdateRequest = await request.json();
    const category = await db.category.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name,
      },
    });
    return NextResponse.json({ status: "OK", data: category }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    const token = request.headers.get("Authorization") ?? "";
    const { error } = await supabase.auth.getUser(token);
    if (error)
      return NextResponse.json({ status: error.message }, { status: 400 });
    const categories = await db.category.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ status: "OK" }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
}
