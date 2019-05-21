import React from "react";

class CarForm extends React.Component {
  // componentWillUnmount() {
  //   console.log("about to be UUmmounting");
  // }
  componentDidMount() {
    if(this.props.car) {
      this.setState({
        ...this.props.car
      });
    }
  }
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { name: "", brand: "", year:""};
  }
  handleChange(event) {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (
      this.state &&
      this.state.name.trim() !== "" &&
      this.state.brand.trim() !== "" &&
      this.state.year.trim() !== ""
    ) {
      this.props.handleSubmit(this.state);
      this.setState({
          name:"",
          brand:"",
          year:""
      });
    }
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="name"
          type="text"
          value={this.state.name}
          onChange={this.handleChange}
          placeholder="Car Brand"
        />
        <input
          name="brand"
          type="text"
          value={this.state.brand}
          onChange={this.handleChange}
          placeholder="Car Model"
        />
        <input
          name="year"
          type="text"
          value={this.state.year}
          onChange={this.handleChange}
          placeholder="Year"
        />

        <button type="submit">
          {this.props.isEdit ? "Save" : "Add"} your car
        </button>
      </form>
    );
  }
}

export default CarForm;
