import React, { Component } from 'react';
import Card from '../atoms/card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './chartControls.css'
import {scopeValues} from '../../value-constants'

class ChartControls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorGradient: props.colorGradient,
        }
    }

    changeScope(daysOffset) {
        // let startDate = new Date();
        // startDate.setDate(startDate.getDate() - daysOffset); //TODO:
        this.props.scopeHandler(daysOffset);
    }

    render() {
        let buttonStyle = {
            backgroundColor: this.state.colorGradient.start,

        }
        return (
            <Card>
                <Row>
                    { scopeValues.map( (buttonData, index) => (
                    <Col xs={3} key={index}>
                        <Button 
                        className="chart-control" 
                        style={buttonStyle} 
                        onClick={() => this.changeScope(buttonData.days)}>
                            {buttonData.text}
                        </Button>
                    </Col>
                    ))}
                </Row>
            </Card>
        );
    }
}

export default ChartControls;