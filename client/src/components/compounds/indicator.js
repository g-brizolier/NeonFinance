import React, {Component} from 'react'
import Gauge from '../molecules/gauge'
import Card from '../atoms/card'
import CardTitle from '../atoms/cardTitle'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {themeGradients} from '../../style-constants'


class Indicator extends Component {

    constructor(props) {
        super(props)
        this.state = {
            symbol: props.symbol,
            type: props.type,
            percent: props.percent,
            gradient: props.colorGradient
        }
    }

    chooseRandomGradient = () => {
        let keys = Object.keys(themeGradients);
        let randomGradient = themeGradients[keys[keys.length * Math.random() << 0]];
        console.log(randomGradient);
        return randomGradient;
    }

    render() {

        

        return(
            <Card>
                <Row>
                    <Col>
                        <CardTitle small margin> 
                            {this.state.type}
                        </CardTitle>
                        <div style={{marginBottom:"-80px"}}>
                            <Gauge 
                            symbol={this.state.symbol}
                            percent={this.state.percent}
                            gradient={this.state.gradient}/>
                        </div>
                            <p style={{textAlign:"center"}}>Strong Sell</p>
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default Indicator;