import React from "react"
import { Link } from "gatsby"
import "./Header.scss"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"

export default function Header() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Systems Obscure
          </Navbar.Brand>
          <Nav className="me justify-content-end">
            <Nav.Link href="https://github.com/thomasabishop">GitHub</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>

    // <div className="Header">
    //   <Link to="/">
    //     <h1 className="site-title">Systems Obscure</h1>
    //     {/* <span>Another software engineer with a blog</span> */}
    //     {/* <div className="Header">
    //     <h1>Systems Obscure</h1> */}
    //     {/* <div className="Header__site-title">Systems Obscure</div> */}
    //     {/* </div> */}
    //   </Link>
    // </div>
  )
}
