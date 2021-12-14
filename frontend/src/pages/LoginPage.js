import React, {Component} from "react";

import NavigationBar from "../components/NavigationBar";
import {Button, Form} from "react-bootstrap";

import "./LoginPage.css"

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    componentDidMount() {
    }

    handleSignInClick() {
        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                'username': this.usernameRef.current.value,
                'password': this.passwordRef.current.value
            })
        }).then(res => this.props.history.push('/'))
            .catch(err => this.props.history.push('/login'));
    }

    render() {
        return (
            <div className="login-form">
                <h4>Sign in</h4>
                <Form.Control ref={this.usernameRef} className="mb-2" placeholder="Username"/>
                <Form.Control ref={this.passwordRef} className="mb-2" type="password" placeholder="Password"/>
                <Button onClick={this.handleSignInClick.bind(this)}>Sign in</Button>
            </div>
        );
    }
}

export default LoginPage;
