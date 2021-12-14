import React, {Component} from "react";
import {Container, Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

class NavigationBar extends Component {
    render() {
        return (
            <Navbar bg="white" expand="lg" fixed="top">
                <Container>
                    <Navbar.Brand><Link style={{color: "black"}} to={"/"}>Cat Pics</Link></Navbar.Brand>
                    <Nav>
                        <Nav.Link href="/logout">Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        );
    }
}

export default NavigationBar;