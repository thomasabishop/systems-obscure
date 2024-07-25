import React from "react"
import Main from "../templates/main/Main"
import UiGroup from "../components/UiGroup/UiGroup"

export default function About() {
  return (
    <Main>
      <UiGroup title="About">
        <p>
          This blog is a sort of personal scrapbook. I document the details of
          my technical life so I can have a record of progress when I look back.
          Doing this publicly motivates me to take care with my writing and to
          be as clear as possible.{" "}
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
