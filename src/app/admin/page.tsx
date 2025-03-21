import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AdminPage = () => {
  const articles = [
    {
      id: 1,
      title: "記事1",
      date: "2025年3月21日",
    },
    {
      id: 2,
      title: "記事2",
      date: "2025年3月20日",
    },
    {
      id: 3,
      title: "記事3",
      date: "2025年3月19日",
    },
    {
      id: 4,
      title: "記事4",
      date: "2025年3月18日",
    },
  ];

  return (
    <div className="container mx-auto p-4 max-w-2xl bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        記事一覧
      </h1>

      <div className="flex flex-col space-y-3">
        {articles.map((article) => (
          <Card
            key={article.id}
            className="w-full transition-all duration-300 hover:shadow-lg hover:translate-x-1 border-l-4 border-l-blue-500 overflow-hidden cursor-pointer"
          >
            <CardHeader className="p-4 bg-white">
              <CardTitle className="text-lg font-medium text-gray-800">
                {article.title}
              </CardTitle>
              <CardDescription className="text-xs text-gray-500 mt-1">
                {article.date}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
