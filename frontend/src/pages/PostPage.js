import React, {Component} from "react";
import {Button, Card, Carousel, Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import Nav from "../components/Nav";

class PostPage extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.loadPost();
    }

    loadPost() {
        fetch("/api/posts/" + this.props.match.params.id, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => res.json())
            .then(res => this.setState({post: res}));
    }

    render() {
        if (!this.state.post) {
            return (<></>);
        }

        let images = [];
        for (let image of this.state.post.images) {
            images.push(<Carousel.Item>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "600px"}}>
                    <Image src={"http://localhost:8080/api/images/" + image}
                           style={{maxHeight: "600px", maxWidth: "100%"}}
                           rounded/>
                </div>
            </Carousel.Item>)
        }

        return (
            <>
                <Nav/>
                <div className="main-container" style={{paddingTop: "80px", gridGap: "20px"}}>
                    <Card className="centered-block">
                        <Card.Body>
                            <Card.Title>{this.state.post.title}</Card.Title>
                            <Card.Text>
                                {this.state.post.description}
                                {this.state.post.images ?
                                    <Carousel controls={this.state.post.images.length > 1}
                                              indicators={this.state.post.images.length > 1}>
                                        {images}
                                    </Carousel> : null
                                }
                            </Card.Text>
                            <Button>{this.state.post.likes} Likes</Button>
                            <Button className={"ml-1"} style={{float: "right"}}>Share</Button>
                            <Button style={{float: "right"}}>Comments</Button>
                        </Card.Body>
                    </Card>
                </div>
            </>
        );
    }
}

export default PostPage;