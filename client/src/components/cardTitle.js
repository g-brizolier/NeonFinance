import React, { Component } from 'react'
import './cardTitle.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class CardTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            small: props.small,
            margin: props.margin
        }
    }

    render() {
        var style = {}
        this.state.small ? style.fontSize = "25px" : style = {}
        this.state.margin ? style.marginBottom = "30px" : style = style
        return (
            <Row className="card-title-custom">
                <Col>
                    <h2 style={style}>{this.props.children}</h2>
                </Col>
            </Row>
        );
    }
}

export default CardTitle;