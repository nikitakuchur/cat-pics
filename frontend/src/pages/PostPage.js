import React, {Component} from "react";
import {Button, Card, Carousel, Image} from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import {Redirect} from "react-router-dom";

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
                "Content-type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        }).then(res => res.json())
            .then(res => this.setState({post: res}))
            .catch(err => this.props.history.push('/login'));
    }

    render() {
        if (!localStorage.getItem("token")) {
            return <Redirect to="/login"/>;
        }

        if (!this.state.post) {
            return (<></>);
        }

        let images = [];
        for (let image of this.state.post.images) {
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
                <NavigationBar/>
                <div className="main-container" style={{paddingTop: "80px", gridGap: "20px"}}>
                    <Card className="centered-block">
                        <Card.Body>
                            <Card.Title>{this.state.post.title}</Card.Title>
                            <Card.Text>
                                {this.state.post.description}
                            </Card.Text>
                            {this.state.post.images ?
                                <Carousel controls={this.state.post.images.length > 1}
                                          indicators={this.state.post.images.length > 1}>
                                    {images}
                                </Carousel> : null
                            }
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