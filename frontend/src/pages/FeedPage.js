import React, {Component} from "react";
import {Card, Button, Image, Carousel} from "react-bootstrap";
import {Link} from "react-router-dom";

import NewPostModal from "../modals/NewPostModal";
import Nav from "../components/Nav";
import './Post.css';

class FeedPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showNewPostModal: false,
            posts: [],
        };
    }

    componentDidMount() {
        this.loadPosts();
    }

    loadPosts() {
        fetch("/api/posts", {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => res.json())
            .then(res => this.setState({posts: res}))
            .catch(err => this.props.history.push('/login'));
    }

    getImage(name) {
        return fetch("/api/files" + name, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        });
    }

    card(post) {
        let images = [];
        for (let image of post.images) {
            images.push(<Carousel.Item>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "600px"}}>
                    <Image src={"http://localhost:8080/api/images/" + image}
                           style={{maxHeight: "600px", maxWidth: "100%"}}
                           rounded/>
                </div>
            </Carousel.Item>)
        }
        return (
            <Card className="centered-block" key={post.id}>
                <Card.Body>
                    <Card.Title><Link style={{color: "black"}} to={"/posts/" + post.id}>{post.title}</Link></Card.Title>
                    <Card.Text>
                        {post.description}
                        {post.images ?
                            <Carousel controls={post.images.length > 1} indicators={post.images.length > 1}>
                                {images}
                            </Carousel> : null
                        }
                    </Card.Text>
                    <Button>{post.likes} Likes</Button>
                    <Button className={"ml-1"} style={{float: "right"}}>Share</Button>
                    <Button style={{float: "right"}}>Comments</Button>
                </Card.Body>
            </Card>
        );
    }

    handleOkButtonClick = (post) => {
        this.setState({showNewPostModal: false});
        const formData = new FormData();
        for (let image of post.images) {
            formData.append("files", image);
        }
        fetch("/api/images", {
            method: "POST",
            body: formData
        }).then(res => res.json())
            .then(res => {
                fetch("/api/posts", {
                    method: "POST",
                    body: JSON.stringify({
                        title: post.title,
                        description: post.description,
                        images: res
                    }),
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then(() => this.loadPosts());
            });

    }

    render() {
        let posts = [];
        for (let post of this.state.posts) {
            posts.push(this.card(post));
        }

        return (
            <>
                <NewPostModal show={this.state.showNewPostModal}
                              onCancelButtonClick={() => this.setState({showNewPostModal: false})}
                              onOkButtonClick={this.handleOkButtonClick}/>
                <Nav/>
                <div className="main-container" style={{paddingTop: "80px", gridGap: "20px"}}>
                    <Button className="centered-block" variant="outline-primary" size="lg" style={{height: "80px"}}
                            onClick={() => this.setState({showNewPostModal: true})}>Show your cat to the world!</Button>
                    {posts}
                </div>
            </>
        );
    }
}

export default FeedPage;
