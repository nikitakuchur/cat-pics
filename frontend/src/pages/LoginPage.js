import React, {Component} from "react";
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";

import "./Form.css"

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
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
            if (res.status === 200) {
                localStorage.setItem("token", res.headers.get("authorization"));
                localStorage.setItem("user", username);
                this.props.history.push('/');
            }
        }).catch(err => {
            console.log(err);
            this.props.history.push('/login');
        });
    }

    render() {
        return (
            <div className="form" onKeyDown={e => {
                if (e.key === 'Enter') {
                    this.handleSignInClick.bind(this)();
                }
            }}>
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
