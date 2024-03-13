import React from "react"
import { Link } from "gatsby"
import "./Header.scss"

export default function Header() {
  return (
    // <>
    //   <Navbar
    //     collapseOnSelect
    //     bg="dark"
    //     expand="lg"
    //     data-bs-theme="dark"
    //     fixed="top"
    //   >
    //     <Container>
    //       <Navbar.Brand as={Link} to="/" style={{ letterSpacing: "0.4px" }}>
    //         Systems Obscure
    //       </Navbar.Brand>
    //       <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //       <Navbar.Collapse
    //         id="responsive-navbar-nav"
    //         className="justify-content-end"
    //       >
    //         <Nav className="me">
    //           <Nav.Link as={Link} to="/code-metrics">
    //             Code Metrics
    //           </Nav.Link>

    //           <Nav.Link href="https://github.com/thomasabishop">
    //             GitHub
    //           </Nav.Link>
    //         </Nav>
    //       </Navbar.Collapse>
    //     </Container>
    //   </Navbar>
    // </>

    <div className="Header">
      <div className="box-outline">
        <Link to="/">
          <h2 className="site-title">Systems Obscure</h2>
          {/* <div className="Header">
        <h1>Systems Obscure</h1> */}
          {/* <div className="Header__site-title">Systems Obscure</div> */}
          {/* </div> */}
        </Link>
      </div>
    </div>
  )
}
