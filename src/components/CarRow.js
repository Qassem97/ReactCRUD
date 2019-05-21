import React, { Component, Fragment } from "react";
import CarForm from "./CarForm";

class CarRow extends Component {
  state = {
    inDetails: true
  };

  // render car item
  renderCar() {
    return (
      <li>
        
        <span> {this.props.car.name}</span>
        <span> {this.props.car.brand}</span>
        <span> {this.props.car.year}</span>
        <div className="btn-group">
        <button className="edit-btn" onClick={() => this.toggleState()}>Edit</button>
        <button className="delete-btn"
          onClick={() => {
            this.props.deleteCar(this.props.car.id);
          }}
        >
          Remove
        </button>
        </div>

      </li>
    );
  }

  // toggleState
  toggleState = () => {
    let { inDetails } = this.state;
    this.setState({
      inDetails: !inDetails
    });
  };

  updateCar = car => {
    this.toggleState();
    this.props.editCar(car);
  };

  render() {
    let { inDetails } = this.state;
    return (
      <Fragment>
        {inDetails ? (
          this.renderCar()
        ) : (
          <CarForm
            handleSubmit={this.updateCar}
            isEdit={true}
            car={this.props.car}
          />
        )}
      </Fragment>
    );
  }
}

export default CarRow;
