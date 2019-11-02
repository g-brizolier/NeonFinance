import React, {Component} from 'react'
import Indicator from './indicator'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from '../atoms/card'
import CardTitle from '../atoms/cardTitle'

class IndicatorGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            indicators: props.indicators,
            max_indicators: props.max_indicators,
            colorGradient: props.colorGradient,
            symbol: props.symbol || "AAPL"
        }
    }

    prepareIndicators(arr) {
        let res = [];
        for (let i =0; i < this.state.max_indicators - 1; i+=2) {
            res[i] = [arr[i], arr[i+1]]; // build array of arrays for easier mapping
        }
        return res;
    }

    render() {

        let componentRowStyle = {
            padding:"10px",
        }

        let gradient = this.state.colorGradient;

        return (
            <React.Fragment>
                <Row>
                    {this.prepareIndicators(this.state.indicators).map(
                        (el) => (
                            <Col key={el}>
                                {el.map(object => (
                                    <Row key={object} style={componentRowStyle}>
                                        <Indicator 
                                        symbol={this.state.symbol}
                                        type={object}
                                        percent={35}
                                        colorGradient={gradient}
                                        />
                                    </Row>
                                ))}
                            </Col> 
                        )
                    )}
                </Row>

                {this.props.symbol ?
                
                <Row>
                    <Col>
                        <Row style={componentRowStyle}>
                            <Card>
                                <CardTitle small>
                                    More...
                                </CardTitle>
                            </Card>
                        </Row>
                    </Col>
                </Row>
                :
                <div></div>
            }
            </React.Fragment>
        );
    }
}

export default IndicatorGrid;
