import { useEffect, useState } from 'react';
import Col from './Components/Col';
import './App.css'
import Hand from './Components/Hand';

function App() {
  let deck = [
    'A-1', '2-1', '3-1', '4-1', '5-1', '6-1', '7-1', '8-1', '9-1', '10-1', 'J-1', 'Q-1', 'K-1',
    'A-2', '2-2', '3-2', '4-2', '5-2', '6-2', '7-2', '8-2', '9-2', '10-2', 'J-2', 'Q-2', 'K-2',
    'A-3', '2-3', '3-3', '4-3', '5-3', '6-3', '7-3', '8-3', '9-3', '10-3', 'J-3', 'Q-3', 'K-3',
    'A-4', '2-4', '3-4', '4-4', '5-4', '6-4', '7-4', '8-4', '9-4', '10-4', 'J-4', 'Q-4', 'K-4'
  ]
  const [shuffle, setShuffle] = useState([]);

  const [closed1, setClosed1] = useState([]);
  const [closed2, setClosed2] = useState([]);
  const [closed3, setClosed3] = useState([]);
  const [closed4, setClosed4] = useState([]);
  const [closed5, setClosed5] = useState([]);
  const [closed6, setClosed6] = useState([]);

  const [opened1, setOpened1] = useState([]);
  const [opened2, setOpened2] = useState([]);
  const [opened3, setOpened3] = useState([]);
  const [opened4, setOpened4] = useState([]);
  const [opened5, setOpened5] = useState([]);
  const [opened6, setOpened6] = useState([]);
  const [opened7, setOpened7] = useState([]);

  const [hand, setHand] = useState([]);

  // const [final1, setFinal1] = useState([]);
  // const [final2, setFinal2] = useState([]);
  // const [final3, setFinal3] = useState([]);
  // const [final4, setFinal4] = useState([]);

  useEffect(() => {
    shuffleFunc()
  }, [])

  function shuffleFunc() {
    var currentIndex = deck.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = deck[currentIndex];
      deck[currentIndex] = deck[randomIndex];
      deck[randomIndex] = temporaryValue;
    }
    setShuffle(deck);

    setClosed1(deck.slice(0, 6));
    setClosed2(deck.slice(8, 13));
    setClosed3(deck.slice(15, 19));
    setClosed4(deck.slice(21, 24));
    setClosed5(deck.slice(26, 28));
    setClosed6(deck.slice(30, 31));
    // setClosed7(deck.slice(32, 33));

    setOpened1(deck.slice(6, 7));
    setOpened2(deck.slice(13, 14));
    setOpened3(deck.slice(19, 20));
    setOpened4(deck.slice(24, 25));
    setOpened5(deck.slice(28, 29));
    setOpened6(deck.slice(31, 32));
    setOpened7(deck.slice(32, 33));


    setHand(deck.slice(33, 52));
  }


  console.log(shuffle)
  console.log(hand)
  // console.log('1', opened1)
  // console.log(closed2)
  // console.log(closed3)
  // console.log(closed4)
  // console.log(closed5)
  // console.log(closed6)
  // console.log(closed7)
  // console.log(opened)

  function handleColMove(a, b) {
    console.log(a, b)
  }

  return (
    <div className="App">
      solitaire
      <button onClick={() => shuffleFunc()}>Shuffle</button>
      <div className='gameContainer' >
        <Col id={1} closed={closed1} opened={opened1} handleColMove={handleColMove}></Col>
        <Col id={2} closed={closed2} opened={opened2} handleColMove={handleColMove}></Col>
        <Col id={3} closed={closed3} opened={opened3} handleColMove={handleColMove}></Col>
        <Col id={4} closed={closed4} opened={opened4} handleColMove={handleColMove}></Col>
        <Col id={5} closed={closed5} opened={opened5} handleColMove={handleColMove}></Col>
        <Col id={6} closed={closed6} opened={opened6} handleColMove={handleColMove}></Col>
        <Col id={7} opened={opened7}></Col>
      </div>
      <Hand hand={hand} />
    </div >
  );
}

export default App;
