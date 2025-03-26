"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CategoryList } from "./_components/CategoryList";

const AdminPage = () => {
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
      <CategoryList />
    </div>
  );
};

export default AdminPage;
