import { db } from "@/lib/db";
import { Post } from "@/types";
import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export type CreatePostRequest = {
  title: string;
  content: string;
  thumbnailUrl: string;
  categories: { id: number }[];
};

export async function POST(request: NextRequest) {
  const token = request.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);
  if (error)
    return NextResponse.json({ status: error.message }, { status: 400 });
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
    return NextResponse.json(post);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization") ?? "";
    const { error } = await supabase.auth.getUser(token);
    if (error)
      return NextResponse.json({ status: error.message }, { status: 400 });
    const posts: Post[] = await db.post.findMany({
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
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
}
