import React from 'react';

class WordAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      original: "",
      target: ""
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    debugger;
    this.props.onWordAdded({
      original: this.state.original,
      translation: this.state.target,
      lastRevised: null
    });
    
    this.setState({
      original: "",
      target: ""
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="original">Original</label>
        <input type="text" onChange={this.handleInputChange} value={this.state.original}name="original" />

        <label htmlFor="target">Target</label>
        <input type="text" onChange={this.handleInputChange} value={this.state.target}name="target" />

        <input type="submit" value="Add word" />
      </form>
    )
  }
}

export default WordAdder;