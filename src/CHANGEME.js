import React, { Component } from 'react';
import RemineTable from './components/Table/RemineTable/RemineTable';
import properties from './properties';

class Test extends Component {
  render() {
    return (
        <div className="testContainer">
            <div className="filterContainer">
                Your filters go here.
            </div>
            <RemineTable properties={properties} />
        </div>
    );
  }
}

export default Test;
