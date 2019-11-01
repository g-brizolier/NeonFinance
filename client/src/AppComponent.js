// /client/App.js
import React, { Component } from 'react';
// import Chart from 'react-apexcharts'
import ChartRow from './components/compounds/chartRow'
import NavBar from './components/molecules/navBar'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

class App extends Component {
  // initialize our state
  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
  };

  render() {

    return (
      <Container fluid={true}>
        <Row>
          <NavBar />
        </Row>
        <ChartRow />
      </Container>
    );
  }
}

export default App;