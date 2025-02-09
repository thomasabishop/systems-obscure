import React from "react"
import Main from "../templates/main/Main"
import UiGroup from "../components/UiGroup/UiGroup"
import portrait from "../img/portrait.jpg"
import UiButton from "../components/UiButton/UiButton"

import notByAiBadge from "../img/not-by-ai-alternative--gruvbox-material6.svg"
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
				<p>I am a self-taught software engineer from London.</p>
				<p>
					This blog is a technical scrapbook. I document the details of my
					technical life so I can have a record of progress when I look back.
					Doing this publicly motivates me to take care with my writing and to
					be as clear as possible.{" "}
				</p>
				<p>
					Currently I work for{" "}
					<a
						href="https://en.wikipedia.org/wiki/ITV_(TV_network)"
						target="_blank"
					>
						ITV
					</a>{" "}
					{""}
					as a backend software engineer. Before that I worked as a full-stack
					engineer at the <a href="https://en.wikipedia.org/wiki/BBC">
						BBC
					</a>{" "}
					and as a frontend engineer at{" "}
					<a href="https://www.arria.com/">Arria NLG</a> and in several web
					developer roles.{" "}
				</p>

				<h3>Website theme</h3>
				<p>
					This is my own design and however the colour scheme is derived from{" "}
					<a href="https://github.com/sainnhe/gruvbox-material">
						Gruvbox Material
					</a>
					.
				</p>
				<div style={{ marginBottom: "2rem" }}></div>
				{/* <img
          style={{ width: "100px" }}
          src={notByAiBadge}
          alt="Written by a human, not by AI"
        /> */}
			</UiGroup>
		</Main>
	)
}

export const Head = () => <title>About | Systems Obscure</title>
