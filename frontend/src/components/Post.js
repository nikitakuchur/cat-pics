import React, {Component} from "react";
import {withRouter} from 'react-router-dom';
import {
    Button,
    Card,
    Carousel,
    Container,
    Image,
    Row,
    ToggleButton,
} from "react-bootstrap";
import {Link} from "react-router-dom";

import "./Post.css"

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
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(() => this.props.history.push('/'));
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

        return (
            <>
                <Card className="centered-block">
                    <Card.Body>
                        <Container>
                            <Row className="justify-content-md-end" xs="auto">
                                {this.props.deletable ?
                                    <Button variant="link" className={"m-0 p-0 me-2"} style={{fontSize: 12, color: "grey"}}
                                            onClick={this.handleDeleteButtonClick}>delete</Button> : null}
                                <Button variant="link" className={"m-0 p-0"}
                                   style={{fontSize: 12, color: "grey"}}>{this.props.post.author.username}</Button>
                            </Row>
                        </Container>
                        <Card.Title>
                            <Link style={{color: "black", fontSize: "24px"}} className="text-decoration-none"
                                  to={"/posts/" + this.props.post.id}>{this.props.post.title}</Link>
                        </Card.Title>
                        <Card.Text className={"mt-3"}>
                            {this.props.post.description}
                        </Card.Text>
                        {this.props.post.images ?
                            <Carousel className={"mb-4"} controls={this.props.post.images.length > 1}
                                      indicators={this.props.post.images.length > 1} slide={false}>
                                {images}
                            </Carousel> : null
                        }
                        <ToggleButton value="1" variant="outline-primary">
                            {this.props.post.likes} Likes
                        </ToggleButton>
                        <Button className={"ms-2"} style={{float: "right"}}>Share</Button>
                        <Button style={{float: "right"}}>Comments</Button>
                    </Card.Body>
                </Card>
            </>
        );
    }
}

export default withRouter(Post);