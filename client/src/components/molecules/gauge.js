import React from 'react';

import {XYPlot, ArcSeries, GradientDefs} from 'react-vis';
import {themeConstants} from '../../style-constants'

export default class Gauge extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      symbol: props.symbol,
      gradient: props.gradient
    }
  }

  render() {
    return (
      <XYPlot
        xDomain={[-3, 3]}
        yDomain={[-3, 3]}
        width={170}
        height={170}
      >
        <GradientDefs>
          <linearGradient id={this.state.symbol} x1="1" x2="0" y1="0" y2="0">
          <stop offset="0%" stopColor={this.state.gradient.start} stopOpacity={1}/>
          <stop offset="100%" stopColor={this.state.gradient.stop} stopOpacity={1} />
          </linearGradient>
        </GradientDefs>
        <ArcSeries
          radiusDomain={[0, 3]}
          center={{x:-0.8, y:0}}
          data={[
            {angle: Math.PI - Math.PI/2, radius0: 3, radius: 3.5, angle0: -Math.PI/2}
          ]}
          color={themeConstants.bgColorDarkDim}
          colorType="literal"
        />
        <ArcSeries
          radiusDomain={[0, 3]}
          center={{x:-0.8, y:0}}
          data={[
            {angle: Math.PI/4 - Math.PI/2, radius0: 3, radius: 3.5, angle0: -Math.PI/2}
          ]}
          color={`url(#${this.state.symbol})`}
        />
      </XYPlot>
    );
  }
}