import React, { Component } from 'react';
import { themeGradients } from '../style-constants';
import Row from 'react-bootstrap/Row'
import Carousel from 'react-bootstrap/Carousel'
import ChartComponent from './chartComponent'


class chartRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
        }
    }

    render() {
        return (
            <Row className="justify-content-md-center">
                <Carousel
                controls={false}
                interval={null}
                >   
                {[
                    {
                        symbol: "AAPL",
                        gradient: themeGradients.gradient_halloween
                    },
                    {
                        symbol: "MSFT",
                        gradient: themeGradients.gradient2
                    },
                    {
                        symbol: "SNAP",
                        gradient: themeGradients.gradient3
                    }
                ].map(el => (
                    <Carousel.Item>
                        <ChartComponent
                            symbol={el.symbol}
                            colorGradient={el.gradient}
                            chartType="history"
                        />
                    </Carousel.Item>
                ))}
                </Carousel>
            </Row>
        );
    }
}

export default chartRow;