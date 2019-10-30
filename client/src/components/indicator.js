import React, {Component} from 'react'
import Gauge from './gauge'
import Card from './card'
import CardTitle from './cardTitle'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class Indicator extends Component {

    constructor(props) {
        super(props)
        this.state = {
            symbol: props.symbol
        }
    }

    render() {
        return(
            <Card>
                <Row>
                    <Col>
                        <CardTitle title="SMA" />
                        <div style={{marginBottom:"-80px"}}>
                            <Gauge symbol={this.state.symbol}/>
                        </div>
                        <p style={{textAlign:"center", bottom: "200px"}}>Strong Sell</p>
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default Indicator;