import React, { Component } from 'react'
import {themeConstants, themeFonts}  from '../style-constants'


class Card extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isChart: props.isChart,
        }
    }

    render () {
        const style = {
          backgroundColor: themeConstants.bgColorDark,
          padding: "30px",
          paddingBottom: this.state.isChart ? "15px" : "30px", // organic fix so charts look better
          borderRadius: "30px",
          color: themeConstants.greyLight,
          fontFamily: themeFonts.main,
          display: "inline-block",
        }
        
        return (
            <div style={style}>
                {this.props.children}
            </div>
        );
    }
}
export default Card;