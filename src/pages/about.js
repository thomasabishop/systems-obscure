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
            Pictured with the Colossus Mk.2 at the{" "}
            <a href="https://www.tnmoc.org/" target="_blank">
              National Museum of Computing
            </a>
            , Bletchley Park.
          </div>
        </div>
        <p>
          Hi, I'm Thomas. I'm a self-taught software engineer currently working
          at the BBC.
        </p>
        <p>
          This blog is a sort of scrapbook and probably only interesting to me!
          I document the details of my technical life so I can have a record of
          progress when I look back. Doing this publicly motivates me to take
          care with my writing and to be as clear as possible.{" "}
        </p>
        <h3>Website theme</h3>
        <p>
          This is my own design but it is obviously inspired by the peerless
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
          If you are really keen you can look at the{" "}
          <a href="https://github.com/thomasabishop">source code</a>.
        </p>
      </UiGroup>
    </Main>
  )
}

export const Head = () => <title>About | Systems Obscure</title>
