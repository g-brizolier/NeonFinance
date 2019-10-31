import React, { Component } from 'react';
import '../../node_modules/react-vis/dist/style.css';
import { XYPlot, XAxis, YAxis, LineSeries } from 'react-vis'
import {themeFonts, themeConstants}  from '../style-constants'
import CircularProgress from "@material-ui/core/CircularProgress"
import Card from './card'
import CardTitle from './cardTitle'

class stockChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: props.height,
      width: props.width || props.height,
      symbol: props.symbol,
      data: [],
      intervalIsSet: false,
      gradient: props.colorGradient,
      dataPoints: 0,
      type: props.type,
      startDate: props.startDate
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
        this.setState({data: this.props.data});
    }
    if (prevProps.startDate !== this.props.startDate) {
      this.setState({startDate: this.props.startDate});
    }
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

  computeStrokeWidth() {
    let nPoints = this.state.dataPoints;
    if (nPoints >= 5000) {
      return 2
    } else if (nPoints >= 2000) {
      return 3
    } else if (nPoints >= 500) {
      return 4
    }
  }

  // TODO: do something so that data displays more nicely.


  render() {

    const axisStyle = {
      line: {stroke: 'none'},
      ticks: {stroke: 'white'},
      text: {stroke: 'none', fill: themeConstants.greyLight, fontWeight: 600, fontSize: 15, fontFamily: themeFonts.main}
    }

    return (
      <Card isChart={true}>
            <CardTitle>
            {this.state.symbol}
            </CardTitle>
            {
              this.state.data.length <= 0 ?
              <React.Fragment>
                <div style={{width: this.state.width,
                height:this.state.height,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center"}}>
                  <CircularProgress style={{alignSelf: "center", color: this.state.gradient.start}}/>
                </div>
              </React.Fragment>
              : 
              <React.Fragment>
                <XYPlot height={this.state.height} width={this.state.width}>
                  

                  <LineSeries curve={'curveMonotoneX'} data={this.state.data} style={{strokeWidth: this.computeStrokeWidth()}} color={`url(#${this.state.symbol})`} animation/>

                  <XAxis style={axisStyle} tickFormat={time => new Date(time).toLocaleDateString()} tickTotal={3}/>
                  <YAxis style={axisStyle} tickFormat={value => `${value}`}/>

                </XYPlot>
              </React.Fragment>
            }
      </Card>
    );
  }
}

export default stockChart;