import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await db.post.findMany({
      include: {
        PostCategory: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return NextResponse.json({ status: "OK", data: posts }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
}
