import React from "react";
import { Link } from "gatsby";

export default function Header() {
  return (
    <div className="header">
      <Link to="/" className="header__site-title">
        systems obscure
      </Link>
    </div>
  );
}
