// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';
// import Chart from 'react-apexcharts'
import ChartRow from './components/chartRow'
import NavBar from './components/navBar'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
const serverURL = "http://ec2-35-178-212-20.eu-west-2.compute.amazonaws.com:3001"

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

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = (message, month) => {
    console.log("adding month: " + month);
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post(serverURL + '/api/putData', {
      id: idToBeAdded,
      message: message,
      month: month
    });
  };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = (idTodelete) => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id === idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete(serverURL + '/api/deleteData', {
      data: {
        _id: objIdToDelete,
      },
    });
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    parseInt(idToUpdate);
    this.state.data.forEach((dat) => {
      if (dat.id === idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post(serverURL + '/api/updateData', {
      id: objIdToUpdate,
      update: { message: updateToApply },
    });
  };

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
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