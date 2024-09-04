import React from "react"
import Main from "../templates/main/Main"
import UiGroup from "../components/UiGroup/UiGroup"
import portrait from "../img/portrait.jpg"
import UiButton from "../components/UiButton/UiButton"

export default function About() {
  return (
    <Main>
      <UiGroup title="About">
        <div className="float">
          <img alt="A portrait of the blog author" src={portrait} width="250" />
          <div className="caption">
            Pictured with the WITCH computer at the{" "}
            <a href="https://www.tnmoc.org/" target="_blank">
              National Museum of Computing
            </a>
            , Bletchley Park.
          </div>
        </div>
        <p>
          My name is Thomas. I am a self-taught software engineer from London.
        </p>
        <p>
          This blog is a technical scrapbook. I document the details of my
          technical life so I can have a record of progress when I look back.
          Doing this publicly motivates me to take care with my writing and to
          be as clear as possible.{" "}
        </p>

        <p>
          <a href="https://github.com/thomasabishop" target="_blank">
            GitHub
          </a>
        </p>
        <h3>Website theme</h3>
        <p>
          This is my own design and a labour of love, inspired by the peerless
          interfaces of the past.
        </p>
        <p>
          I've drawn on many great resources in creating the UI:{" "}
          <a href="https://jdan.github.io/98.css">98.css</a>, the{" "}
          <a href="https://github.com/grassmunk/Chicago95">
            Chicago95 GTK theme
          </a>
          , the{" "}
          <a href="http://toastytech.com/guis/index.html">
            Graphical User Interface Gallery
          </a>{" "}
          and the{" "}
          <a href="https://www.webdesignmuseum.org/">Web Design Museum</a>, to
          name a few.
        </p>
        <p>
          The colour scheme is derived from{" "}
          <a href="https://github.com/sainnhe/gruvbox-material">
            Gruvbox Material
          </a>
          . The body font is <a href="https://fsd.it/shop/fonts/sys/">Sys</a>{" "}
          and the monospaced font is{" "}
          <a href="https://terminus-font.sourceforge.net/">Pragmata Pro</a>.
        </p>

        <div style={{ marginBottom: "2rem" }}></div>
      </UiGroup>
    </Main>
  )
}

export const Head = () => <title>About | Systems Obscure</title>
