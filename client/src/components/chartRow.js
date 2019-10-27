import React, { Component } from 'react';
import { themeGradients } from '../style-constants';
import Row from 'react-bootstrap/Row'
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
                {[
                    {
                        symbol: "AAPL",
                        gradient: themeGradients.gradient1
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
                    <ChartComponent
                        symbol={el.symbol}
                        colorGradient={el.gradient}
                        chartType="history"
                    />
                ))}
            </Row>
        );
    }
}

export default chartRow;