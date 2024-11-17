import React from "react"
import Header from "../../components/Header/Header"
import notByAiBadge from "../../img/not-by-ai-alternative--gruvbox-material6.svg"

export default function Main(props) {
  return (
    <>
      <Header />
      <div className="main">{props.children}</div>
      <div className="footer">
        <a href="https://github.com/thomasabishop" target="_blank">
          GitHub
        </a>
        <a href="https://hachyderm.io/@systemsobscure" target="_blank">
          Mastodon
        </a>
      </div>
    </>
  )
}
