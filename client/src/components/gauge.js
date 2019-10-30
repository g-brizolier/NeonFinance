import React from 'react';

import {XYPlot, ArcSeries, YAxis, XAxis} from 'react-vis';
import {themeConstants} from '../style-constants'

const PI = Math.PI;

export default class Gauge extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      symbol: props.symbol
    }
  }

  render() {
    return (
      <XYPlot
        xDomain={[-3, 3]}
        yDomain={[-3, 3]}
        width={170}
        getAngle={d => d.time}
        height={170}
      >
        <ArcSeries
          radiusDomain={[0, 3]}
          center={{x:-0.8, y:0}}
          data={[
            {time: Math.PI - Math.PI/2, radius0: 3, radius: 3.5, angle0: -Math.PI/2}
          ]}
          color={themeConstants.bgColorDarkDim}
          colorType="literal"
        />
        <ArcSeries
          radiusDomain={[0, 3]}
          center={{x:-0.5, y:0}}
          data={[
            {time: Math.PI/4 - Math.PI/2, radius0: 3, radius: 3.5, angle0: -Math.PI/2}
          ]}
          color={`url(#${this.state.symbol})`}
        />
      </XYPlot>
    );
  }
}