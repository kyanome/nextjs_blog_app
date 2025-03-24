import { db } from "@/lib/db";
import { CreatePostRequest } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { title, content, thumbnailUrl, categories }: CreatePostRequest =
      await request.json();
    const post = await db.post.create({
      data: {
        title,
        thumbnailUrl,
        content,
        PostCategory: {
          create: categories.map((category) => ({
            category: {
              connect: {
                id: category.id,
              },
            },
          })),
        },
      },
    });
    return NextResponse.json({
      status: "OK",
      message: "作成しました",
      id: post.id,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
}

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
