import React from "react"
import Header from "../../components/Header/Header"
import notByAiBadge from "../../img/not-by-ai-alternative--gruvbox-material6.svg"

export default function Main(props) {
  return (
    <>
      <Header />
      <div className="main">
        {props.children}
        <img
          style={{ width: "100px" }}
          src={notByAiBadge}
          alt="Written by a human, not by AI"
        />
      </div>
    </>
  )
}
