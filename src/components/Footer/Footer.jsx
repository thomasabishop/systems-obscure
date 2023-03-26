import React from "react"
import notByAiBadge from "./not-by-ai-badge.svg"
import notByAiBadgeDark from "./not-by-ai-badge-dark.svg"
export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__wrapper">
        <img className="not-ai-badge" src={notByAiBadge} />
      </div>
    </div>
  )
}
