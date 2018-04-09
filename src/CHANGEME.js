import React, {Component} from 'react';
import RemineTable from './components/Table/RemineTable/RemineTable';
import Api from './API';
import './CHANGEME.css';

class Test extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      filteredData: [],
      buildingTypes: [],
      filteredBuildings: [],
      bedMin: 0,
      bedMax: Infinity,
      bathMin: 0,
      bathMax: Infinity
    }
  }

  componentDidMount() {
    Promise.all([Api.getBuildingTypes(), Api.getLocations()])
    .catch(err => console.log(err))
    .then(([buildingRes, locationRes]) => {
      this.setState({buildingTypes: buildingRes.data, data: locationRes.data, filteredData: locationRes.data});
    });
  }

  handleFilters = (e) => {
    let filteredData = this.state.data
    if (this.state.filteredBuildings.length) {
      filteredData = this.state.data.filter((data) => this.state.filteredBuildings.find(type => data.buildingType.id === type))
    }
    filteredData = filteredData.filter((data) => data.beds >= this.state.bedMin
    && data.beds <= this.state.bedMax
    && data.baths >= this.state.bathMin
    && data.baths <= this.state.bathMax)
    this.setState({filteredData: filteredData})
  }

  handleBeds = (min, max) => {
    const minVal = isNaN(parseInt(min, 10))
      ? 0
      : parseInt(min, 10);
    const maxVal = isNaN(parseInt(max, 10))
      ? Infinity
      : parseInt(max, 10);

    this.setState({
      bedMin: minVal,
      bedMax: maxVal
    }, () => this.handleFilters())
  }
  handleBaths = (min, max) => {
    const minVal = isNaN(parseInt(min, 10))
      ? 0
      : parseInt(min, 10);
    const maxVal = isNaN(parseInt(max, 10))
      ? Infinity
      : parseInt(max, 10);

    this.setState({
      bathMin: minVal,
      bathMax: maxVal
    }, () => this.handleFilters())
  }
  handleChangeBuilding = (e) => {
    const filteredBuildings = this.state.filteredBuildings;
    const id = parseInt(e.target.value, 10);
    if (e.target.checked) {
      filteredBuildings.push(id)
    } else {
      const removeIndex = filteredBuildings.indexOf(id);
      filteredBuildings.splice(removeIndex, 1);
    }
    this.setState({
      filteredBuildings: filteredBuildings
    }, () => this.handleFilters())
  }

  render() {
    return (<div className="testContainer">
      <div className="checkboxInputs">
      {
        this.state.buildingTypes.map(type => (<div className="form-check form-check-inline" key={type.id}>
          <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value={type.id} onChange={this.handleChangeBuilding}/>
          <label className="form-check-label" htmlFor="inlineCheckbox1">{type.name}</label>
        </div>))
      }
      </div>
      <div className="center">
        <div className="form-group">
          <label htmlFor="bed">Bed Rooms</label>
          <div className="row">
            <input type="number" className="form-control col-md-6" id="bed" placeHolder="Min" onChange={(e) => this.handleBeds(e.target.value, this.state.bedMax)}/>
            <input type="number" className="form-control col-md-6" id="bed" placeHolder="Max" onChange={(e) => this.handleBeds(this.state.bedMin, e.target.value)}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="bath">Bath Rooms</label>
          <div className="row">
            <input type="number" className="form-control col-md-6" id="bath" onChange={(e) => this.handleBaths(e.target.value, this.state.bathMax)}/>
            <input type="number" className="form-control col-md-6" id="bath" onChange={(e) => this.handleBaths(this.state.bathMin, e.target.value)}/>
          </div>
        </div>
      </div>
      <div className="filterContainer">
        <RemineTable properties={this.state.filteredData}/>
      </div>
    </div>);
  }
}

export default Test;
