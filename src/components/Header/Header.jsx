import React from "react";
import { Link } from "gatsby";
import logoDark from "./sys-obs-logo-dark.svg";
import logoLight from "./sys-obs-logo-light.svg";
export default function Header() {
  return (
    <div className="header">
      <div className="header__wrapper">
        <img src={logoDark} alt="logo" className="header__logo" />
        <Link to="/" className="header__site-title">
          Systems Obscure
        </Link>
      </div>
    </div>
  );
}
