import React from "react"
import Main from "../templates/main/Main"

export default function About() {
  return (
    <Main>
      <h2 className="post__title">About</h2>
      <p>
        This blog is a sort of personal scrapbook. I don't pretend it's
        interesting to anyone but me. I'm a self-taught and probably mediocre
        software engineer, working hard to get better.
      </p>

      <p>
        I document the minutiae of my technical life so I can have some kind of
        record of progress when I look back. Doing this publicly motivates me to
        take care with my writing and to be as clear as possible.{" "}
      </p>

      <p>
        Sometimes I try to write about matters of substance - politics, culture
        and the like. But I find it very difficult to express my thoughts
        coherently and usually abandon these posts.
      </p>

      <h3>Website theme</h3>
      <p>
        This is my own design but it is a synthesis of other people's work and
        is obviously inspired by the peerless interfaces of the past, before
        rounded borders disgraced the earth. The colour scheme is based on
        Sainhe's{" "}
        <a href="https://github.com/sainnhe/gruvbox-material">
          Gruvbox Material
        </a>
        . The body font is <a href="https://fsd.it/shop/fonts/sys/">Sys</a> and
        the monospaced font is Liberation Mono.
      </p>
      <p>
        The UI elements are directly inspired by Windows 95 and Windows 98. I've
        borrowed from <a href="https://jdan.github.io/98.css">98.css</a>, the{" "}
        <a href="https://github.com/grassmunk/Chicago95">Chicago95 GTK theme</a>
        , and the{" "}
        <a href="http://toastytech.com/guis/index.html">
          Graphical User Interface Gallery
        </a>{" "}
        which is a terrific compendium of screenshots of old operating systems.
      </p>
      <p>
        If you are really keen you can look at the{" "}
        <a href="https://github.com/thomasabishop">source code</a>.
      </p>
    </Main>
  )
}
