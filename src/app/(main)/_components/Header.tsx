import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white px-6 py-6 font-bold flex justify-between items-center">
      <Link href="/" className="ml-4">
        Blog
      </Link>
      <Link href="/contact" className="ml-4">
        お問い合わせ
      </Link>
    </header>
  );
};

export default Header;
