"use client";
import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAdminPosts } from "./_hooks/useAdminPosts";

const AdminPage = () => {
  const { posts, isLoading } = useAdminPosts();

  return (
    <div className="container mx-auto p-4 max-w-3xl bg-gray-50 min-h-screen">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">記事一覧</h1>
        <Link href={"/admin/posts/new"}>
          <Button variant="secondary" className="bg-brand-500 text-white">
            記事作成
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="py-10 text-center text-gray-500">読み込み中...</div>
      ) : !posts || posts.length === 0 ? (
        <div className="py-10 text-center text-gray-500">
          <p>記事がまだありません</p>
        </div>
      ) : (
        <div className="flex flex-col space-y-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/admin/posts/${post.id}`}>
              <Card className="w-full transition-all duration-300 hover:shadow-lg hover:translate-x-1 border-l-4 border-l-blue-500 overflow-hidden cursor-pointer">
                <CardHeader className="p-4 bg-white">
                  <CardTitle className="text-lg font-medium text-gray-800">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-gray-500 mt-1">
                    {new Date(post.created_at).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
