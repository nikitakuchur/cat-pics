import React, {Component} from "react";
import {Button, Form} from "react-bootstrap";

import "./Form.css"
import {Link} from "react-router-dom";

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
        const username = this.usernameRef.current.value;
        const password = this.passwordRef.current.value;
        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                'username': username,
                'password': password
            })
        }).then(res => {
            localStorage.setItem("token", res.headers.get("authorization"));
            localStorage.setItem("user", username);
            this.props.history.push('/');
        }).catch(err => this.props.history.push('/login'));
    }

    render() {
        return (
            <div className="form">
                <h4>Log in</h4>
                <Form.Control ref={this.usernameRef} className="mb-2" placeholder="Username"/>
                <Form.Control ref={this.passwordRef} className="mb-2" type="password" placeholder="Password"/>
                <Button onClick={this.handleSignInClick.bind(this)}>Log in</Button>
                <Link to="/signup">Create a new account</Link>
            </div>
        );
    }
}

export default LoginPage;
