import { db } from "@/app/(main)/_lib/db";
import { NextRequest, NextResponse } from "next/server";

interface CategoryEditRequest {
  name: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    const category = await db.category.findUnique({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ status: "OK", data: category }, { status: 200 });
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
    const { name }: CategoryEditRequest = await request.json();
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
    const categories = await db.category.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ status: "OK" }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
}
