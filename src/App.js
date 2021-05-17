import { useEffect, useState } from 'react';
import Col from './Components/Col';
import './Sass/App.scss'
import Hand from './Components/Hand';

function App() {
  let deck = [
    '1-1', '2-1', '3-1', '4-1', '5-1', '6-1', '7-1', '8-1', '9-1', '10-1', '11-1', '12-1', '13-1',
    '1-2', '2-2', '3-2', '4-2', '5-2', '6-2', '7-2', '8-2', '9-2', '10-2', '11-2', '12-2', '13-2',
    '1-3', '2-3', '3-3', '4-3', '5-3', '6-3', '7-3', '8-3', '9-3', '10-3', '11-3', '12-3', '13-3',
    '1-4', '2-4', '3-4', '4-4', '5-4', '6-4', '7-4', '8-4', '9-4', '10-4', '11-4', '12-4', '13-4'
  ]
  const [shuffle, setShuffle] = useState([]);

  const [closed, setClosed] = useState({});

  const [opened, setOpened] = useState({});

  const [hand, setHand] = useState([]);

  // const [final1, setFinal1] = useState([]);
  // const [final2, setFinal2] = useState([]);
  // const [final3, setFinal3] = useState([]);
  // const [final4, setFinal4] = useState([]);

  useEffect(() => {
    shuffleFunc();
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
    setClosed({
      '1': deck.slice(0, 6),
      '2': deck.slice(8, 13),
      '3': deck.slice(15, 19),
      '4': deck.slice(21, 24),
      '5': deck.slice(26, 28),
      '6': deck.slice(30, 31),
    })
    setOpened({
      '1': deck.slice(6, 7),
      '2': deck.slice(13, 14),
      '3': deck.slice(19, 20),
      '4': deck.slice(24, 25),
      '5': deck.slice(28, 29),
      '6': deck.slice(31, 32),
      '7': deck.slice(32, 33)
    }
    )

    setHand(deck.slice(33, 52));
  }


  const [cardMove, setCardMove] = useState('')
  const [colDrop, setColDrop] = useState('')

  function handleColMove({ card, col }) {
    if (card) {
      setCardMove(card)
    }
    if (col) {
      setColDrop(col)
    }
  }

  //column change
  useEffect(() => {
    if (cardMove !== colDrop && colDrop.length > 0) {
      const initCol = cardMove.substring(4, 5)
      const finalcol = colDrop.substring(4, 5)
      const lastItem = opened[finalcol][opened[finalcol].length - 1];
      console.log(cardMove)
      if (
        (parseInt(lastItem.split('-')[1]) % 2 === 0 && !(parseInt(cardMove.split('-')[3]) % 2 == 0)
          ||
          !(parseInt(lastItem.split('-')[1]) % 2 === 0) && parseInt(cardMove.split('-')[3]) % 2 == 0)
        &&
        parseInt(lastItem.split('-')[0]) - 1 === parseInt(cardMove.split('-')[2])
      ) {

        if (finalcol[finalcol.length - 1] === parseInt(cardMove.split('-')[2]) + 1) {
          console.log('greter by 1')
        }

        let losingCol = [];
        const indexOfCard = (opened[initCol]).indexOf(cardMove.split('card-')[1]);
        let gainingCol = [...opened[finalcol]];
        opened[initCol].forEach((item, index) => {
          if (index < indexOfCard) {
            losingCol.push(item)
          }
          else {
            gainingCol = [...gainingCol, item]
          }
        })

        setOpened({ ...opened, [initCol]: losingCol, [finalcol]: gainingCol })
      }

      setCardMove('')
      setColDrop('')

    }
  }, [cardMove, colDrop])

  //open card refill
  useEffect(() => {
    Object.keys(opened).forEach((item, index) => {
      if (item < 7 && opened[item].length === 0 && closed[item].length > 0) {
        const newClosed = closed[item].filter((itm, index) => index !== closed[item].length - 1);
        const newOpened = closed[item].filter((itm, index) => index === closed[item].length - 1);
        setClosed({ ...closed, [item]: newClosed })
        setOpened({ ...opened, [item]: newOpened })
        console.log('objitem', opened[item], closed[item], newClosed)

      }
    })
  }, [opened])

  return (
    <div className="App">
      solitaire
      <button onClick={() => shuffleFunc()}>Shuffle</button>
      <div className='gameContainer' >
        <Col id={1} opened={opened[1]} handleColMove={handleColMove} closed={closed[1]}></Col>
        <Col id={2} opened={opened[2]} handleColMove={handleColMove} closed={closed[2]}></Col>
        <Col id={3} opened={opened[3]} handleColMove={handleColMove} closed={closed[3]}></Col>
        <Col id={4} opened={opened[4]} handleColMove={handleColMove} closed={closed[4]}></Col>
        <Col id={5} opened={opened[5]} handleColMove={handleColMove} closed={closed[5]}></Col>
        <Col id={6} opened={opened[6]} handleColMove={handleColMove} closed={closed[6]}></Col>
        <Col id={7} opened={opened[7]} handleColMove={handleColMove}></Col>
      </div>
      <Hand hand={hand} />
    </div >
  );
}

export default App;
