import { db } from "@/lib/db";
import { Post } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export interface UpdatePostRequest {
  title: string;
  content: string;
  thumbnailUrl: string;
  categories: { id: number }[];
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const post: Post | null = await db.post.findUnique({
      where: { id: parseInt(id) },
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
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.log(`error : ${error}`);
    return NextResponse.json({ error: error, status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const { title, content, thumbnailUrl, categories }: UpdatePostRequest =
      await request.json();
    const post = await db.post.update({
      where: { id: parseInt(id) },
      data: {
        title,
        content,
        thumbnailUrl,
        PostCategory: {
          deleteMany: {},
          create: categories.map((category) => ({
            category: { connect: { id: category.id } },
          })),
        },
      },
    });
    return NextResponse.json({ status: 200, data: post });
  } catch (error) {
    console.log(`error : ${error}`);
    return NextResponse.json({ error: error, status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const posts = await db.post.delete({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json({ status: 200, data: posts });
  } catch (error) {
    console.log(`error : ${error}`);
    return NextResponse.json({ error: error, status: 500 });
  }
}
