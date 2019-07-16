import React from 'react';

class WordRevision extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      revisionInProgress: false,
      wordsCount: 10
    }
  }

  wordsCount = (event) => {
    this.setState({ wordsCount: event.target.value })
  }

  startRevision = () => {

  }

  render() {
    return (
      <div>
        <label htmlFor="number">Number of Words</label>
        <input type="number" step="1" min="5" value={this.state.wordsCount} name="number" onChange={this.wordsCount} disabled={this.state.revisionInProgress}/>
        <button onClick={this.startRevision} disabled={this.state.revisionInProgress}>Start</button>
      </div>
    );
  }
}

export default WordRevision;