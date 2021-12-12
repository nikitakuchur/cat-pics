import React, {Component} from "react";

class LogoutPage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        fetch("/api/logout", {
        method: "GET"
    }).then(res => this.props.history.push('/login'))
        .catch(err => this.props.history.push('/'));
    }

    render() {
        return (
            <></>
        );
    }
}

export default LogoutPage;
