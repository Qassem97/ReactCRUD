import React, { Component } from "react";
import CarForm from "./components/CarForm";
import CarRow from "./components/CarRow";

const url = "https://localhost:44358/api/cars/";
class App extends Component {
  state = {
    cars: []
  };

  componentDidMount() {
    fetch(url).then(res => {
      if (res.ok) {
        res.json().then(json => {
          console.log(json);
          this.setState({
            cars: json
          });
        });
      }
    });
  }

  //add car
  addCar = car => {
    fetch(url , {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(car)
    })
      .then(res => {
        res.json().then(car => {
          this.setState({
            cars: [...this.state.cars, car]
          });
        });
      })
      .catch(error => {
        console.log("Adding car didn't work!");
      });
  };

  // delete car
  deleteCar = id => {
    // let cars = this.state.cars;
    // cars.splice(index, 1);
    // this.setState({
    //   cars
    // });
    fetch(url + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res =>{
        if(res.ok && res.status === 204) {
          this.setState({
            cars: this.state.cars.filter(c => c.id !== id)
          });
        }
      })
  };

  // edit car
  editCar = car => {
    // let cars = this.state.cars;
    // this.setState({ cars: cars.map(c => (c.id === car.id ? car : c)) });
    fetch(url + car.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(car)
    })
      .then(res => {
        res.json().then(car => {
          let cars = this.state.cars;
          this.setState({ cars: cars.map(c => (c.id === car.id ? car : c)) });
        });
      })
      .catch(error => {
        console.log("Editing car didn't work!");
      });
  };

  render() {
    const { cars } = this.state;
    const carList = cars.map(car => {
      return (
        <CarRow
          car={car}
          deleteCar={this.deleteCar}
          key={car.id}
          editCar={this.editCar}
        />
      );
    });
    return (
      <section className="App">
        <h2> Buy and sell Cars </h2>
        <CarForm isEdit={false} handleSubmit={this.addCar} />
        <ul>{carList}</ul>
      </section>
    );
  }
}

export default App;
