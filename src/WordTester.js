import React from 'react';
import WordAdder from './WordAdder';
import WordRevision from './WordRevision';


// accepts prop words
class WordTester extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: this.props.words.sort(this.wordSortFn).reverse(),
      display: "table"
    }
  }

  wordSortFn = (a, b) => {
    if (!a.lastRevised) {
      return -1;
    }
    if (!b.lastRevised) {
      return 0;
    }
    if (a.lastRevised < b.lastRevised) {
      return 1;
    }
  }

  showExportWords = () => {
    this.setState({
      display: "link",
      link: 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({
        words: this.state.words,
        originalLanguage: this.props.original,
        targetLanguage: this.props.target,

      }))
    })
  }

  showTable = () => {
    this.setState({
      display: "table"
    })
  }

  showRevise = () => {
    this.setState({
      display: "revise"
    })
  }

  showAddWords = () => {
    this.setState({
      display: "add"
    })
  }

  addWord = (word) => {
    let words = this.state.words;
    words.push(word);
    this.setState({
      words: words
    })
  }

  updateWords = (words) => {
    this.setState({
      words: words.sort(this.wordSortFn).reverse()
    });
  }

  render() {
    let wordList = this.state.words;
    let list = wordList.map((word, index) =>
      <tr key={"line-" + index}>
        <td>{word.original}</td>
        <td>{word.translation}</td>
        <td>{word.lastRevised ? (new Date(word.lastRevised)).toString() : "Never"}</td>
      </tr>
    );

    return (
      <div>
        <h2>From {this.props.original} to {this.props.target}</h2>
        <nav>
          <button onClick={this.showTable}>Show table</button>
          <button onClick={this.showRevise} disable={this.state.words.length < 10}>Revise</button>
          <button onClick={this.showAddWords}>Add words</button>
          <button onClick={this.showExportWords}>Export words</button>
        </nav>
        {this.state.display === "add" && <WordAdder onWordAdded={this.addWord} />}
        {this.state.display === "revise" && <WordRevision words={this.state.words} onWordsUpdated={this.updateWords} />}
        {this.state.display === "link" && <a href={this.state.link} download="words.json">Download updated words</a>}
        {this.state.display === "table" &&
          <table>
            <thead>
              <tr>
                <th>{this.props.original}</th>
                <th>{this.props.target}</th>
                <th>Last revised</th>
              </tr>
            </thead>
            <tbody>
              {list}
            </tbody>
          </table>
        }
      </div>
    );
  }
}

export default WordTester;