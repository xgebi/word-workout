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
    let wordList = this.props.words.slice(0, this.state.wordsCount)

    for (let i = wordList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wordList[i], wordList[j]] = [wordList[j], wordList[i]];
    }

    let langSettings = [];
    for (let i = 0; i < this.state.wordsCount; i++) {
      langSettings.push(Math.random() > 0.5 ? "original" : "translation")
    }

    this.setState({
      revisedWords: wordList,
      revisionInProgress: true,
      step: 0,
      langSettings: langSettings
    });
  }

  stopRevisingByButton = () => {

  }

  nextStep = (event) => {
    let atTheEndStep = 0;
    let self = this;
    function checkWordInArray(word) {
      if (self.state.revisedWords[atTheEndStep].original === word.original && self.state.revisedWords[atTheEndStep].translation === word.translation) {
        return true;
      }
      return false;
    }

    let result;
    let correctAnswer = this.state.langSettings[this.state.step] === "original" ? this.state.revisedWords[this.state.step].original : this.state.revisedWords[this.state.step].translation;
    result = event.target.textContent === correctAnswer ? "You were right" : "Wrong! \"" + this.state.revisedWords[this.state.step].translation + "\" is \"" + this.state.revisedWords[this.state.step].original + "\"";
    if (this.state.step + 1 >= this.state.revisedWords.length) {
      let words = this.props.words;
      for (let i = 0; i <= this.state.step; i++) {
        let index = this.props.words.findIndex(checkWordInArray);
        words[index].lastRevised = new Date();
        atTheEndStep++;
      }

      this.setState({
        lastResult: result,
        revisionInProgress: false
      });
      this.props.onWordsUpdated(words)
      return;
    }
    this.setState({
      lastResult: result,
      step: this.state.step + 1
    });
  }

  renderOptions = () => {
    let words = [];
    let position = Math.ceil(Math.random() * 6) - 1;
    for (let i = 0; i < 6; i++) {
      if (i === position) {
        let word = this.state.revisedWords[this.state.step];
        words.push(
          <button key={"button-" + i} onClick={this.nextStep}>{this.state.langSettings[this.state.step] === "original" ? word.original : word.translation}</button>
        );
        continue;
      }

      let word;
      while (!word) {
        let pos = Math.ceil(Math.random() * this.props.words.length) - 1;
        let tempWord = this.props.words[pos];
        if (tempWord.original !== this.state.revisedWords[this.state.step].original &&
          tempWord.translation !== this.state.revisedWords[this.state.step].translation) {
          word = tempWord;
        }
      }
      words.push(
        <button key={"button-" + i} onClick={this.nextStep}>{this.state.langSettings[this.state.step] === "original" ? word.original : word.translation}</button>
      );
    }
    return words;
  }

  render() {
    return (
      <div>
        <label htmlFor="number">Number of Words</label>
        <input type="number" step="1" min="5" max={this.props.words.length} value={this.state.wordsCount} name="number" onChange={this.wordsCount} disabled={this.state.revisionInProgress} />
        <button onClick={this.startRevision} disabled={this.state.revisionInProgress}>Start</button>
        {this.state.lastResult && <p>{this.state.lastResult}</p>}
        {this.state.revisionInProgress &&
          <div>
            <p>{this.state.langSettings[this.state.step] !== "original" ? this.state.revisedWords[this.state.step].original : this.state.revisedWords[this.state.step].translation}</p>
            <section>
              {this.renderOptions()}
            </section>
            <button onClick={this.stopRevisingByButton}>Stop</button>
          </div>}
      </div>
    );
  }
}

export default WordRevision;