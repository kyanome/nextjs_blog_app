"use client";
import { useSupabaseSession } from "@/hooks/useSupabaseSession";
import { supabase } from "@/utils/supabase";
import Link from "next/link";
import React from "react";

const Header = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };
  const { session, isLoding } = useSupabaseSession();

  return (
    <header className="bg-gray-800 text-white px-6 py-6 font-bold flex justify-between items-center">
      <Link href="/" className="ml-4">
        Blog
      </Link>
      {!isLoding && (
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Link href="/admin" className="ml-4">
                管理画面
              </Link>
              <button onClick={handleLogout}>ログアウト</button>
            </>
          ) : (
            <>
              <Link href="/contact" className="ml-4">
                お問い合わせ
              </Link>
              <Link href="/login" className="ml-4">
                ログイン
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
