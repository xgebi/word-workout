import React from 'react';

class WordAdder extends React.Component {

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
    this.props.onWordAdded({
      original: this.state.original,
      translation: this.state.target,
      lastRevised: null
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="original">Original</label>
        <input type="text" onChange={this.handleInputChange} name="original" />

        <label htmlFor="target">Target</label>
        <input type="text" onChange={this.handleInputChange} name="target" />

        <input type="submit" value="Add word" />
      </form>
    )
  }
}

export default WordAdder;