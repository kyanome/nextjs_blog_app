"use client";
import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useDataFetch } from "@/hooks/useDataFetch";
import { Category } from "@/types";

const AdminPage = () => {
  const { data: categories, loading } =
    useDataFetch<Category[]>("admin/categories");

  return (
    <div className="container mx-auto p-4 max-w-3xl bg-gray-50 min-h-screen">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">カテゴリ一覧</h1>
        <Link href={"/admin/categories/new"}>
          <Button variant="secondary" className="bg-brand-500 text-white">
            カテゴリ作成
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="py-10 text-center text-gray-500">読み込み中...</div>
      ) : !categories || categories.length === 0 ? (
        <div className="py-10 text-center text-gray-500">
          <p>カテゴリがまだありません</p>
        </div>
      ) : (
        <div className="flex flex-col space-y-3">
          {categories.map((category) => (
            <Link key={category.id} href={`/admin/categories/${category.id}`}>
              <Card className="w-full transition-all duration-300 hover:shadow-lg hover:translate-x-1 border-l-4 overflow-hidden cursor-pointer">
                <CardHeader className="p-4 bg-white">
                  <CardTitle className="text-lg font-medium text-gray-800">
                    {category.name}
                  </CardTitle>
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
