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
    let wordList = this.props.words.slice(0, this.state.wordsCount - 1)

    for (let i = wordList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wordList[i], wordList[j]] = [wordList[j], wordList[i]];
    }

    this.setState({
      revisedWords: wordList,
      revisionInProgress: true
    });
  }

  stopRevisingByButton = () => {

  }

  render() {
    let words = "";
    return (
      <div>
        <label htmlFor="number">Number of Words</label>
        <input type="number" step="1" min="5" max={this.props.words.length} value={this.state.wordsCount} name="number" onChange={this.wordsCount} disabled={this.state.revisionInProgress}/>
        <button onClick={this.startRevision} disabled={this.state.revisionInProgress}>Start</button>
        {this.state.revisionInProgress && 
        <div>
          <section>
            {words}
          </section>
          <button onClick={this.stopRevisingByButton}>Stop</button>
        </div>}
      </div>
    );
  }
}

export default WordRevision;