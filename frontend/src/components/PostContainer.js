import React, {Component} from "react";
import NavigationBar from "../components/NavigationBar";

import "./Post.css"

class PostContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                <NavigationBar/>
                <div className="main-container" style={{paddingTop: "80px", gridGap: "20px"}}>
                    {this.props.children}
                </div>
            </>
        );
    }
}

export default PostContainer;