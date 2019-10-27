import React, { Component } from 'react'
import './navBar.css'
// import { themeConstants } from '../style-constants'

class NavBar extends Component {
    render() {
        return (
            <div className="navbar" style={{backgroundColor: "transparent"}}>
                {this.props.children}
            </div>
        );
    }
}

export default NavBar;