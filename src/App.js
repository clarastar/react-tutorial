import React, { Component } from 'react';
import './App.css';
import Table from './Table';
import Form from './Form';


class App extends Component {
  state = {
    characters : [
      {
        name: 'Charlie',
        job: 'Janitor',
      },
      {
        name: 'Mac',
        job: 'Bouncer',
      },
      {
        name: 'Dee',
        job: 'Aspring actress',
      },
      {
        name: 'Dennis',
        job: 'Bartender',
      },
    ],
    data: []
  }
  removeCharacter = index => {
    const { characters } = this.state
    this.setState({
      characters: characters.filter((character, i)=>{
        return i !== index
      })
    }) 
  }
  handleSubmit = character => {
    this.setState({
      characters: [...this.state.characters, character]
    })
  }

   // Code is invoked after the component is mounted/inserted into the DOM tree.
  componentDidMount() {
    const url =
      'https://en.wikipedia.org/w/api.php?action=opensearch&search=Seona+Dancing&format=json&origin=*'

    fetch(url)
      .then(result => result.json())
      .then(result => {
        this.setState({
          data: result,
        })
      })
  }

  render() {
    const { characters, data } = this.state 
    const result = data.map((entry, index) => {
      return <li key={index}>{entry}</li>
    })

    return (
      <div className="container">
        <Table characterData={characters} removeCharacter={this.removeCharacter} />
        <Form handleSubmit={this.handleSubmit}/>
        <ul>{result}</ul>        
      </div>
    )
  }
}

export default App;

