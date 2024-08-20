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
          <i>Husband. Dad. Christian. </i>
        </p>
        <p>
          Just kidding. My name is Thomas. I am a self-taught software engineer.
        </p>
        <p>
          This blog is a mostly technical personal digital scrapbook and, as
          such, of little interest to others. Hence I've put it on the internet.
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

        <h3>The name</h3>
        <p>
          A few years ago I forced myself to read <i>Paradise Lost</i> because I
          became well obssessed with the English Civil Wars for some reason. (It
          was worth it.) The phrase <i>systems obscure</i> popped into my head
          one day around this time and is quite Miltonian, so I may have derived
          it subconsciously. I find it a good catch-all for my interests,
          technical and otherwise.
        </p>
      </UiGroup>
    </Main>
  )
}

export const Head = () => <title>About | Systems Obscure</title>
