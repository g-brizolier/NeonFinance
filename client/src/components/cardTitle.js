import React, { Component } from 'react'
import './cardTitle.css'

class CardTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
        }
    }

    render() {
        return (
            <div className="card-title">
              <h2>{this.state.title}</h2>
            </div>
        );
    }
}

export default CardTitle;