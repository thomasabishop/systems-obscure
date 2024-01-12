import React from "react"
import { Link } from "gatsby"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
export default function Header() {
  return (
    <>
      <Navbar collapseOnSelect bg="dark" expand="lg" data-bs-theme="dark" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ letterSpacing: "0.4px" }}>
            Systems Obscure
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav className="me">
              <Nav.Link as={Link} to="/code-metrics">
                Code Metrics
              </Nav.Link>

              <Nav.Link href="https://github.com/thomasabishop">GitHub</Nav.Link>
            </Nav>
          </Navbar.Collapse>
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
