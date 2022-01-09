import React, {Component} from "react";
import {Button, Card, Carousel, Container, Image, Row} from "react-bootstrap";

import "./Post.css"
import {Link} from "react-router-dom";

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleDeleteButtonClick = () => {
        fetch("/api/posts/" + this.props.post.id, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });
    }

    render() {
        if (!this.props.post) {
            return (<></>);
        }

        let images = [];
        for (let image of this.props.post.images) {
            images.push(<Carousel.Item key={image}>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "600px"}}>
                    <Image src={"/api/images/" + image}
                           style={{maxHeight: "600px", maxWidth: "100%"}}
                           rounded/>
                </div>
            </Carousel.Item>)
        }

        // TODO: Code duplication (see FeedPage.js)
        return (
            <>
                <Card className="centered-block">
                    <Card.Body>
                        <Container>
                            <Row className="justify-content-md-end">
                                {this.props.deletable ? <Link className={"m-0 p-0 mr-2"} style={{fontSize: 14, color: "grey"}}
                                                              to="/" onClick={this.handleDeleteButtonClick}>delete</Link> : null}
                                <p className={"m-0 p-0"} style={{fontSize: 14, color: "grey"}}>{this.props.post.author.username}</p>
                            </Row>
                        </Container>
                        <Card.Title>
                            <Link style={{color: "black"}}
                                  to={"/posts/" + this.props.post.id}>{this.props.post.title}</Link>
                        </Card.Title>
                        <Card.Text>
                            {this.props.post.description}
                        </Card.Text>
                        {this.props.post.images ?
                            <Carousel className={"mb-4"} controls={this.props.post.images.length > 1}
                                      indicators={this.props.post.images.length > 1}>
                                {images}
                            </Carousel> : null
                        }
                        <Button>{this.props.post.likes} Likes</Button>
                        <Button className={"ml-1"} style={{float: "right"}}>Share</Button>
                        <Button style={{float: "right"}}>Comments</Button>
                    </Card.Body>
                </Card>
            </>
        );
    }
}

export default Post;