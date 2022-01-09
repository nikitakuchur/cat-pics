import React, {Component} from "react";
import NavigationBar from "../components/NavigationBar";
import {Redirect} from "react-router-dom";
import PostContainer from "../components/PostContainer";
import Post from "../components/Post";

class PostPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            permissions: [],
            deletable: false
        };
    }

    componentDidMount() {
        this.loadPermissions()
            .then(() => this.loadPost());
    }

    loadPermissions() {
        return fetch("/api/user/permissions", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        }).then(res => res.json())
            .then(res => this.setState({permissions: res}));
    }

    loadPost() {
        fetch("/api/posts/" + this.props.match.params.id, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        }).then(res => res.json())
            .then(res => {
                this.setState({
                    post: res,
                    deletable: localStorage.getItem("user") === res.author.username
                        || this.state.permissions.includes("post:delete")
                });
            })
            .catch(err => this.props.history.push('/login'));
    }

    render() {
        if (!localStorage.getItem("token")) {
            return <Redirect to="/login"/>;
        }

        // TODO: Code duplication (see FeedPage.js)
        return (
            <>
                <NavigationBar/>
                <PostContainer>
                    <Post post={this.state.post} deletable={this.state.deletable}/>
                </PostContainer>
            </>
        );
    }
}

export default PostPage;