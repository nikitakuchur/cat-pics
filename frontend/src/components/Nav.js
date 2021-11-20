import React, {Component} from "react";
import {Container, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

class Nav extends Component {
    render() {
        return (
            <Navbar bg="white" expand="lg" fixed="top">
                <Container>
                    <Navbar.Brand><Link style={{color: "black"}} to={"/"}>Cat Pics</Link></Navbar.Brand>
                </Container>
            </Navbar>
        );
    }
}

export default Nav;