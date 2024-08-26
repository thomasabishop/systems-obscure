import React from "react"
import Main from "../templates/main/Main"
import UiGroup from "../components/UiGroup/UiGroup"
import portrait from "../img/portrait.jpg"

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
          This blog is a mostly technical digital scrapbook and, as such, of
          little interest to others. Hence I put it on the internet.
        </p>
        <h3>Website theme</h3>
        <p>
          This is my own design and a labour of love, inspired by the peerless
          interfaces of the past.
        </p>
        <p>
          In creating the UI elements I've studied{" "}
          <a href="https://jdan.github.io/98.css">98.css</a>, the{" "}
          <a href="https://github.com/grassmunk/Chicago95">
            Chicago95 GTK theme
          </a>
          , and the{" "}
          <a href="http://toastytech.com/guis/index.html">
            Graphical User Interface Gallery
          </a>{" "}
          which is a terrific compendium of screenshots of old operating
          systems. The colour palette is derived from {""}
          <a href="https://github.com/sainnhe/gruvbox-material">
            Gruvbox Material
          </a>
          . The body font is <a href="https://fsd.it/shop/fonts/sys/">Sys</a>{" "}
          and the monospaced font is{" "}
          <a href="https://terminus-font.sourceforge.net/">Terminus</a>.
        </p>

        <p>
          The source code is{" "}
          <a href="https://github.com/thomasabishop/systems-obscure">
            available here
          </a>
          .
        </p>
        <div style={{ marginBottom: "2rem" }}></div>
      </UiGroup>
    </Main>
  )
}

export const Head = () => <title>About | Systems Obscure</title>
