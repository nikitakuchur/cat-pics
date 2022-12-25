import React, {Component} from "react";
import {Button} from "react-bootstrap";
import {Redirect} from "react-router-dom";

import NewPostModal from "../modals/NewPostModal";
import NavigationBar from "../components/NavigationBar";
import Post from "../components/Post";
import PostContainer from "../components/PostContainer";

import '../components/Post.css';

class FeedPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showNewPostModal: false,
            permissions: [],
            posts: [],
        };
    }

    componentDidMount() {
        this.loadPermissions()
            .then(() => this.loadPosts());
    }

    loadPermissions() {
        return fetch("/api/user/permissions", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => res.json())
            .then(res => this.setState({permissions: res}))
            .catch(err => {
                console.log(err);
                this.props.history.push('/login');
            });
    }

    loadPosts() {
        if (!this.state.permissions.includes("post:read")) {
            return;
        }
        fetch("/api/posts", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => res.json())
            .then(res => this.setState({posts: res}));
    }

    saveImages(images) {
        if (!images || images.length === 0) {
            return Promise.resolve();
        }
        const formData = new FormData();
        for (let image of images) {
            formData.append("files", image);
        }
        return fetch("/api/images", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: formData
        }).then(res => res.json());
    }

    handleOkButtonClick = (post) => {
        this.setState({showNewPostModal: false});
        this.saveImages(post.images)
            .then(res => {
                fetch("/api/posts", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": "Bearer "+ localStorage.getItem("token")
                    },
                    body: JSON.stringify({
                        title: post.title,
                        description: post.description,
                        images: res
                    })
                }).then(() => this.loadPosts());
            });
    }

    render() {
        if (!localStorage.getItem("token")) {
            return <Redirect to="/login"/>;
        }

        let posts = [];
        for (let post of this.state.posts) {
            posts.push(<Post post={post} key={post.id}/>);
        }

        return (
            <>
                <NewPostModal show={this.state.showNewPostModal}
                              onCancelButtonClick={() => this.setState({showNewPostModal: false})}
                              onOkButtonClick={this.handleOkButtonClick}/>
                <NavigationBar/>
                <PostContainer>
                    {this.state.permissions.includes("post:create") ?
                        <Button className="centered-block" variant="outline-primary" size="lg" style={{height: "80px"}}
                                onClick={() => this.setState({showNewPostModal: true})}>Show your cat to the
                            world!</Button>
                        : null}
                    {posts}
                </PostContainer>
            </>
        );
    }
}

export default FeedPage;
