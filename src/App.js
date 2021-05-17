import { useEffect, useState } from 'react';
import Col from './Components/Col';
import './Sass/App.scss'
import Hand from './Components/Hand';
import FinalCol from './Components/FinalCol';

function App() {
  let deck = [
    '1-1', '2-1', '3-1', '4-1', '5-1', '6-1', '7-1', '8-1', '9-1', '10-1', '11-1', '12-1', '13-1',
    '1-2', '2-2', '3-2', '4-2', '5-2', '6-2', '7-2', '8-2', '9-2', '10-2', '11-2', '12-2', '13-2',
    '1-3', '2-3', '3-3', '4-3', '5-3', '6-3', '7-3', '8-3', '9-3', '10-3', '11-3', '12-3', '13-3',
    '1-4', '2-4', '3-4', '4-4', '5-4', '6-4', '7-4', '8-4', '9-4', '10-4', '11-4', '12-4', '13-4'
  ]
  // const [shuffle, setShuffle] = useState([]);

  const [closed, setClosed] = useState({});

  const [opened, setOpened] = useState({});

  const [hand, setHand] = useState([]);

  const [final, setFinal] = useState({});

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
    // setShuffle(deck);
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

    //finalcol tester
    // const arr1 = ['1-1'];
    // const arr2 = ['1-2'];
    // const arr3 = ['1-3'];
    // const arr4 = ['1-4'];
    // setOpened({ ...opened, '1': arr1, '2': arr2, '3': arr3, '4': arr4, })




    setHand(deck.slice(33, 52));
    setFinal({

      '1': [],
      '2': [],
      '3': [],
      '4': [],
    })
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
    const finalcol = colDrop.substring(4, 5);
    if (opened[finalcol] && cardMove !== colDrop && colDrop.length > 0) {
      const initCol = cardMove.substring(4, 5)
      // console.log(colDrop)
      const lastItem = opened[finalcol][opened[finalcol].length - 1];
      const differentFigure =
        (parseInt(lastItem.split('-')[1]) % 2 === 0 && !(parseInt(cardMove.split('-')[3]) % 2 === 0))
        ||
        (!(parseInt(lastItem.split('-')[1]) % 2 === 0) && parseInt(cardMove.split('-')[3]) % 2 === 0);

      const cardSequence = parseInt(lastItem.split('-')[0]) - 1 === parseInt(cardMove.split('-')[2]);

      if ((differentFigure && cardSequence) || parseInt(lastItem.split('-')[0]) === 14 && cardMove.indexOf('13')) {
        let losingCol = [];
        const indexOfCard = cardMove.indexOf('hand') > -1 ? (hand).indexOf(cardMove.split('card-')[1]) : (opened[initCol]).indexOf(cardMove.split('card-')[1]);
        let gainingCol = [...opened[finalcol]];
        let col = cardMove.indexOf('hand') > -1 ? hand : opened[initCol];
        col.forEach((item, index) => {
          if (index < indexOfCard && col === opened[initCol]) {
            losingCol.push(item)
          }
          else if (index !== indexOfCard && col === hand) {
            losingCol.push(item)
          }
          else {
            gainingCol = [...gainingCol, item]
          }
        })
        if (col === opened[initCol]) {
          setOpened({ ...opened, [initCol]: losingCol, [finalcol]: gainingCol })
        }
        else if (col === hand) {
          setOpened({ ...opened, [finalcol]: gainingCol })
          setHand(losingCol)
        }

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
      }
      if (opened[item].length === 0 && (closed[item] === undefined || closed[item].length === 0)) {
        setOpened({ ...opened, [item]: [`14-0`] })
      }
    })
  }, [opened, closed])

  function handleSetFinal(card, col, fnl) {
    // console.log(card, col, final, final[fnl])
    const newOpened = opened[col].filter(item => item !== card);
    const newFinal = final[fnl];
    console.log(fnl)
    newFinal.push(card)
    setOpened({ ...opened, [col]: newOpened })
    setFinal({ ...final, [fnl]: newFinal })
  }

  return (
    <div className="App">
      <header>
        <div>solitaire
      <button onClick={() => shuffleFunc()}>Shuffle</button></div>



        <div className='finalcols'>
          {Object.keys(final).map((item, index) => <FinalCol key={item} final={final[index + 1]} />)}
        </div>
      </header>
      <div className='gameContainer' >
        {Object.keys(opened).map((item, index) => {
          return (
            <Col key={item} id={item} opened={opened[item]} handleColMove={handleColMove} closed={closed[item]} final={final} setFinal={handleSetFinal}></Col>
          )
        })}
      </div>
      <Hand hand={hand} handleHandMove={handleColMove} final={final} setFinal={handleSetFinal} />
    </div >
  );
}

export default App;
