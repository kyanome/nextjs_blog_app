import { LucideIcon } from "lucide-react";
import { Newspaper, Tag } from "lucide-react";

export type NavItem = {
  icon: LucideIcon;
  name: string;
  path: string;
};

export const navItems: NavItem[] = [
  {
    icon: Newspaper,
    name: "記事一覧",
    path: "/admin/post",
  },
  {
    icon: Tag,
    name: "カテゴリ一覧",
    path: "/admin/categories",
  },
];
