import React from "react";
import Header from "./_components/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="max-w-3xl mx-auto my-10 px-4">{children}</div>
    </div>
  );
};

export default layout;
