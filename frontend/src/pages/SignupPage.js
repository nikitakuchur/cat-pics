import React, {Component} from "react";
import {Button, Form} from "react-bootstrap";

import "./Form.css"
import {Link} from "react-router-dom";

class SignupPage extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
        this.secondPasswordRef = React.createRef();
    }

    handleSignUpClick() {
        const password = this.passwordRef.current.value;
        const secondPassword = this.secondPasswordRef.current.value;

        this.setState({usernameIsTaken: false});
        this.setState({passwordIsTooShort: false});
        this.setState({passwordIsNotConfirmed: false});

        if (password !== secondPassword) {
            this.setState({passwordIsNotConfirmed: true});
            return;
        }

        if (password.length < 8) {
            this.setState({passwordIsTooShort: true});
            return;
        }

        fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                'username': this.usernameRef.current.value,
                'password': this.passwordRef.current.value
            })
        }).then(res => {
            if (res.status === 409) {
                this.setState({usernameIsTaken: true});
            } else {
                this.props.history.push('/login');
            }
        }).catch(err => {
            console.log(err);
            this.props.history.push('/signup');
        });
    }

    render() {
        return (
            <div className="form" onKeyDown={e => {
                if (e.key === 'Enter') {
                    this.handleSignUpClick.bind(this)();
                }
            }}>
                <h4>Sign up</h4>
                <Form.Control ref={this.usernameRef} className="mb-2" placeholder="Username"
                              isInvalid={this.state.usernameIsTaken}/>
                <Form.Control ref={this.passwordRef} className="mb-2" type="password" placeholder="Password"
                              isInvalid={this.state.passwordIsNotConfirmed || this.state.passwordIsTooShort}/>
                <Form.Control ref={this.secondPasswordRef} className="mb-2" type="password"
                              placeholder="Confirm password"
                              isInvalid={this.state.passwordIsNotConfirmed || this.state.passwordIsTooShort}/>
                {this.state.usernameIsTaken ?
                    <p className="mb-2" style={{color: "red"}}>The username is already taken.</p> : null}
                {this.state.passwordIsTooShort ?
                    <p className="mb-2" style={{color: "red"}}>The password must contain at least 8 characters. Please,
                        try again.</p> : null}
                {this.state.passwordIsNotConfirmed ?
                    <p className="mb-2" style={{color: "red"}}>The passwords do not match. Please, try
                        again.</p> : null}
                <Button onClick={this.handleSignUpClick.bind(this)}>Sign up</Button>
                <Link to="/login">I already have an account</Link>
            </div>
        );
    }
}

export default SignupPage;
