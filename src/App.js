import React from 'react';
import './App.css';
import WordTester from './WordTester';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { words: [] };
  }

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

  render() {
    if (this.state.wordsFormatError) {
      return (
        <div className="App">
          Please, use correct word file<br />
          <input type="file" accept="application/json" onChange={this.getFile}/>
        </div>
      );
    }

    if ((this.state.words && this.state.words.length === 0) || !this.state.words) {
      return (
        <div className="App">
          <input type="file" accept="application/json" onChange={this.getFile}/>
        </div>
      )
    }    
    return (
      <div className="App">
        <WordTester words={this.state.words} target={this.state.target} original={this.state.original} />
      </div>
    );
  }
}

export default App;
