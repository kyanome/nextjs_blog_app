import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Category } from "@/types";
import { useDataFetch } from "@/hooks/useDataFetch";

export const CategoryList: React.FC = () => {
  const { data: categories, loading } =
    useDataFetch<Category[]>("admin/categories");

  if (loading) {
    return <div className="py-10 text-center text-gray-500">読み込み中...</div>;
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="py-10 text-center text-gray-500">
        <p>カテゴリがまだありません</p>
      </div>
    );
  }

  return (
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
  );
};
