import React from "react";

const Header = ({ category, title }) => (
  <div className="mb-10">
    <p className="text-3xl font-extrabold tracking-tight mb-5 text-slate-900">
      {title}
    </p>
  </div>
);

export default Header;
