import React, {Component} from 'react';
import {Button, Modal, Form} from "react-bootstrap";

class NewPostModal extends Component {
    static defaultProps = {
        onOkButtonClick: (board) => {
        },
        onCancelButtonClick: () => {
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            titleEmpty: false
        }
        this.nameRef = React.createRef();
        this.descriptionRef = React.createRef();
        this.imagesRef = React.createRef();
    }

    handleOkButtonClick = () => {
        let title = this.nameRef.current.value;
        if (!title) {
            this.setState({titleEmpty: true});
            return;
        }
        this.setState({titleEmpty: false});
        let post = {
            title: this.nameRef.current.value,
            description: this.descriptionRef.current.value,
            images: this.imagesRef.current.files
        };
        this.props.onOkButtonClick(post);
    }

    render() {
        return (
            <Modal
                show={this.props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={this.props.onCancelButtonClick}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        this.handleOkButtonClick();
                    }
                }}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        New post
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control ref={this.nameRef} className="mb-2" placeholder="Title"
                                  isInvalid={this.state.titleEmpty}/>
                    <Form.Control ref={this.descriptionRef} className="mb-2" as="textarea" rows={2}
                                  placeholder="Description"/>
                    <Form.Control ref={this.imagesRef} type="file" multiple/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleOkButtonClick}>Ok</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default NewPostModal;
