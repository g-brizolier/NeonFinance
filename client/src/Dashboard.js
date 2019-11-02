import React, {Component} from 'react'
import IndicatorGrid from "./components/compounds/indicatorGrid"
import NavBar from './components/molecules/navBar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import {themeGradients} from './style-constants'

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            indicators: ["AAPL", "MSFT", "SNAP", "TSLA", "GOGL", "MDR"]
        }
    }

    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <NavBar />
                </Row>
                <Row className="justify-content-md-center">
                    <IndicatorGrid
                        indicators={this.state.indicators}
                        max_indicators={this.state.indicators.length}
                        colorGradient={themeGradients.gradient_halloween}
                    />
                </Row>
            </Container>
        );

    }
}

export default Dashboard;