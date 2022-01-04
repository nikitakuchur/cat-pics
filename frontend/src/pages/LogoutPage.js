import React, {Component} from "react";

class LogoutPage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        localStorage.removeItem("token");
        this.props.history.push('/');
    }

    render() {
        return (
            <></>
        );
    }
}

export default LogoutPage;
