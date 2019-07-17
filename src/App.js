import React from 'react';
import './App.css';
import WordTester from './WordTester';
import WordAdder from './WordAdder';

class App extends React.Component {

  getFile = (event) => {
    let files = event.target.files;

    for (var i = 0, f; f = files[i]; i++) {
      var reader = new FileReader();

      reader.onload = ((theFile) => {
        return (e) => {
          let data = JSON.parse(e.target.result);
          if (!data.words) {
            this.setState({ wordsFormatError: true });
            return;
          }
          
          this.setState({ 
            words: data.words, 
            original: data.originalLanguage,
            target: data.targetLanguage,
            wordsFormatError: false 
          });
        };
      })(f);

      reader.readAsText(f);
    }

  }

  createNewFile = () => {
    this.setState({
      newlyCreated: true,
      words: []
    });
  }

  goPracticing = () => {
    this.setState({
      newlyCreated: false
    });
  }

  addWord = (word) => {
    let words = this.state.words;
    words.push(word);
    this.setState({
      words: words
    });
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    if (this.state && this.state.wordsFormatError) {
      return (
        <div className="App">
          Please, use correct word file<br />
          <input type="file" accept="application/json" onChange={this.getFile}/>
        </div>
      );
    }

    if (this.state && this.state.newlyCreated) {
      return (
        <div>
          <label htmlFor="original">Original:</label>
          <input type="text" value={this.state.original} name="original" onChange={this.handleInputChange}/>

          <label htmlFor="target">Translation:</label>
          <input type="text" value={this.state.target} name="target" onChange={this.handleInputChange}/>


          <WordAdder onWordAdded={this.addWord} />

          <button onClick={this.goPracticing}>Go to practicing</button>
        </div>
      )
    }
    if (this.state && this.state.words.length > 0 && this.state.target && this.state.original) {
      return (
        <div className="App">
          <WordTester words={this.state.words} target={this.state.target} original={this.state.original} />
        </div>
      );
    }

    return (
      <div className="App">
        <input type="file" accept="application/json" onChange={this.getFile}/>
        <p>Or start new learning file: <button onClick={this.createNewFile}>Create</button></p>
      </div>
    )
  }
}

export default App;
