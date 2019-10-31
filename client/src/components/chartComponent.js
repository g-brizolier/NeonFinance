import React, { Component } from 'react';
import StockChart from './stockChart'
import ChartControls from './chartControls'
import Indicator from './indicator'
import Card from './card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CardTitle from './cardTitle';

const serverURL = "http://ec2-35-178-212-20.eu-west-2.compute.amazonaws.com:3001"

class ChartComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            scopedData: [],
            symbol: props.symbol,
            colorGradient: props.colorGradient,
            chartType: props.chartType,
            startDate: "24-10-2019",
            indicators: ["SMA", "Gold Cross", "Indicator 1", "Indicator 2", "Indicator 3"],
            max_indicators: 4
        }

        this.scopeHandler = this.scopeHandler.bind(this);
    }

    compareDataPoints = (dataPoint1, dataPoint2) => {
        if (dataPoint1.x < dataPoint2.x) {
          return -1
        } else if (dataPoint1.x > dataPoint2.x) {
          return 1
        } else {
          return 0
        }
    }

    scopeHandler = (days_offset) => {
        let scopedData;
        if (days_offset == null) {
            let empiricalVal = 200; // This is the number of points that we plot
            let reduceBy = Math.floor(this.state.data.length/empiricalVal);
            scopedData = this.state.data.filter((el, index) => index % reduceBy === 0);
        }
        else {
            let today_index = this.state.data.length;
            scopedData = this.state.data.slice(today_index - days_offset, today_index);
        }

        this.updateData(scopedData);
    }

    updateData = (data) => this.setState({scopedData: data});

    componentDidMount() {
        console.log(`Component mounted with symbol: ${this.state.symbol}`);
        if (this.state.chartType === "history") {
            this.getDataFromDb(this.state.symbol);
        } else if (this.state.chartType === "realTime") {
            this.getDataFromDb(this.state.symbol);
            if (!this.state.intervalIsSet) {
            let symbol = this.state.symbol;
            let getDataFromDb = this.getDataFromDb;
            let interval = setInterval(function () {getDataFromDb(symbol)}, 60000);  //Every minute we refresh the component's data
            this.setState({ intervalIsSet: interval });
            }
        }
    }
    
    componentWillUnmount() {
        if (this.state.intervalIsSet) {
          clearInterval(this.state.intervalIsSet);
          this.setState({ intervalIsSet: null });
        }
    }

    getDataFromDb = (symbol) => {
        console.log(`fetching ${serverURL}/api/getData/${symbol}`)
        fetch(`${serverURL}/api/getData/${symbol}`)
          .then((data) => data.json())
          .then((res) => {
            var dataArray = [];
            res.data.forEach(el => {
              el.Date = (new Date(el.Date).getTime());
              el.Close = parseFloat(el.Close);
              dataArray.push({x: el.Date, y: el.Close});
            });
            dataArray.sort(this.compareDataPoints);
            this.setState({ data: dataArray,  dataPoints: dataArray.length, scopedData: dataArray})
          });
    };

    prepareIndicators(arr) {
        let res = [];
        for (let i =0; i < this.state.max_indicators; i+=2) {
            res[i] = [arr[i], arr[i+1]]; // build array of arrays for easier mapping
        }
        return res;
    }


    render () {
        let componentRowStyle = {
            padding:"10px",
        }

        return (
            <Row>
                <Col>
                    <Row className="justify-content-center" style={componentRowStyle}>
                        <StockChart
                            height={600}
                            width={1000}
                            data={this.state.scopedData}
                            symbol={this.state.symbol} 
                            colorGradient={this.state.colorGradient} 
                            type={this.state.chartType}
                            startDate={this.state.startDate}
                        />
                    </Row>
                    <Row className="justify-content-center" style={componentRowStyle}>
                        <ChartControls
                            colorGradient={this.state.colorGradient}
                            scopeHandler={this.scopeHandler}
                        />
                    </Row>
                </Col>
                <Col>
                    <Row>
                        {this.prepareIndicators(this.state.indicators).map(
                            (el) => (
                                <Col>
                                    {el.map(object => (
                                        <Row style={componentRowStyle}>
                                            <Indicator 
                                            symbol={this.state.symbol}
                                            type={object}
                                            percent={35}
                                            colorGradient={this.state.colorGradient}
                                            />
                                        </Row>
                                    ))}
                                </Col> 
                            )
                        )}
                    </Row>
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
                </Col>
            </Row>
        );
    }
}

export default ChartComponent;