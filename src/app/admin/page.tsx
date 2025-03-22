"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetchPosts } from "./_hooks/useFetchPosts";
import Link from "next/link";

const AdminPage = () => {
  const posts = useFetchPosts();

  return (
    <div className="container mx-auto p-4 max-w-2xl bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        記事一覧
      </h1>

      <div className="flex flex-col space-y-3">
        {posts.map((post) => (
          <Link key={post.id} href={`/admin/post/${post.id}`}>
            <Card className="w-full transition-all duration-300 hover:shadow-lg hover:translate-x-1 border-l-4 border-l-blue-500 overflow-hidden cursor-pointer">
              <CardHeader className="p-4 bg-white">
                <CardTitle className="text-lg font-medium text-gray-800">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-xs text-gray-500 mt-1">
                  {post.created_at}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
