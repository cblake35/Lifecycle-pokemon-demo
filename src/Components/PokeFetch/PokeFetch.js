import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      counter: 10,
    }
  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
        this.countdownTimer();

      })
      .catch((err) => console.log(err))
  }

  interval = () => {
    let timeInterval = setInterval(() => {
      this.setState({
        counter: this.state.counter - 1,
      })
      if (this.state.counter <= 0) {
        clearInterval(timeInterval)
      }
      console.log(this.state.counter)
    }, 1000);
  }

  countdownTimer = () => {
    if (this.state.counter === 10) {
      this.interval();
    } else {
      this.setState({
        counter: this.state.counter + 10,
      })
      this.interval();
    }

  }

  componentDidMount = () => {

  }

  componentDidUpdate = () => {
    if (this.state.counter === 0) {
      document.querySelector('.pokeImg').classList.add('showPokeImg')
    } else {
      document.querySelector('.pokeImg').classList.remove('showPokeImg')
    }
  }

  componentWillUnmount = () => {
    this.setState({
      counter: this.state.counter + 10,
    })
  }

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        {this.state.counter === 0 ? <div className='nameBlock'> <h1 className={'pokeName'}>{this.state.pokeName}</h1></div>
          : this.state.counter >= 9 ? <div><h1 className='titleIntro'>Guess the hidden pokemon!</h1></div>
            : <h1 className={'timer'} >{this.state.counter}s</h1>}
        <div className={'pokeWrap'}>
          <img className={'pokeImg'} src={this.state.pokeSprite} />
        </div>
      </div>
    )
  }
}

export default PokeFetch;